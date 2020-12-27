using Azure.Messaging.ServiceBus;
using iRetailService.Gateway.Interface;
using iRetailService.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
namespace iRetailService.Gateway.Service
{
    public class APIClient : iAPIClient
    {
        //public HttpClient Client { get; }
        private readonly IHttpClientFactory _clientFactory;
        private readonly IConfiguration _configuration;
        private static List<string> _messages = new List<string>();

        public APIClient(IHttpClientFactory clientFactory, IConfiguration configuration)
        {
            // httpClient.BaseAddress = new Uri("https://apis.sentient.io/microservices/cv/peoplecounting/");
            //// httpClient.DefaultRequestHeaders.Add("content-type", "application/json");
            // httpClient.DefaultRequestHeaders.Add("x-api-key", "CD6A2161F6C14D97AEF1"); 
            // Client = httpClient;
            _clientFactory = clientFactory;
            _configuration = configuration;
        }
        public async Task<PeopleCountModel> GetPeopleCount(string videoPath)
        {
            try
            {
                
                byte[] video = File.ReadAllBytes(Path.GetFullPath(_configuration["Settings:VideoRepoPath"]));
                string inputVideo = Convert.ToBase64String(video, 0, video.Length);
                var reqInput = new InputRequest() { video_base64 = inputVideo };

                var httpClient = _clientFactory.CreateClient();
                httpClient.BaseAddress = new Uri(_configuration["Settings:SentientMicroserviceBaseAddress"]);
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                httpClient.DefaultRequestHeaders.Add("x-api-key", _configuration["Settings:SentientAPIKey"]);


                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, _configuration["Settings:SentientPeopleCountAPIEndPoint"]);
                request.Content = new ObjectContent(typeof(InputRequest), reqInput, new JsonMediaTypeFormatter());
                var response = await httpClient.SendAsync(request).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    GetPredictionResponse _res = JsonConvert.DeserializeObject<GetPredictionResponse>(result);
                    PeopleCountModel _result = new PeopleCountModel() { NoOfPeople = _res.Peoples.Count, Appearing = new List<PeopleModel>() };
                    for (int i = 1; i <= _result.NoOfPeople; i++)
                    {
                        string peopleID = i.ToString("D3");
                        List<string> peopleObject = _res.Peoples[i - 1][$"person id: {peopleID}"].ToObject<List<string>>();

                        string duration = peopleObject.Where(x => x.StartsWith("duration appeared")).FirstOrDefault();
                        if (!string.IsNullOrEmpty(duration))
                        {
                            string seconds = duration.Split(':')[1];
                            _result.Appearing.Add(new PeopleModel() { PeopleID = peopleID, DurationAppeared = seconds });
                        }
                    }

                    return _result;
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<string>> GetMessages()
        {
            try
            {
                _messages.Clear();

                await using (ServiceBusClient client = new ServiceBusClient(_configuration["Settings:AzureServiceBusConnectionString"]))
                {
                    // create a processor that we can use to process the messages
                    ServiceBusProcessor processor = client.CreateProcessor("messagetest1", new ServiceBusProcessorOptions());

                    // add handler to process messages
                    processor.ProcessMessageAsync += MessageHandler;

                    // add handler to process any errors
                    processor.ProcessErrorAsync += ErrorHandler;

                    // start processing 
                    await processor.StartProcessingAsync();

                    await processor.StopProcessingAsync();

                    return _messages;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        // handle received messages
        static async Task MessageHandler(ProcessMessageEventArgs args)
        {
            string body = args.Message.Body.ToString();
            _messages.Add(body);
            // complete the message. messages is deleted from the queue. 
            await args.CompleteMessageAsync(args.Message);
        }

        // handle any errors when receiving messages
        static Task ErrorHandler(ProcessErrorEventArgs args)
        {
            return Task.CompletedTask;
        }
    }

}
