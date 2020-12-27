using Google.Cloud.Firestore;
using iRetailService.Gateway.Interface;
using iRetailService.Model;
using Microsoft.Azure.ServiceBus;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Text;
using System.Threading;
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


        private static string _bus_connectionstring = "Endpoint=sb://iretailtest.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=BacWf1RFNNS8WdtXq+2dMBH6isGoJaH5cdpc6LCvq4s=";
        private static string _queue_name = "messagetest1";
        private static QueueClient _client;
        private FirestoreDb fireStoreDb;

        public APIClient(IHttpClientFactory clientFactory, IConfiguration configuration)

        {
            // httpClient.BaseAddress = new Uri("https://apis.sentient.io/microservices/cv/peoplecounting/");
            //// httpClient.DefaultRequestHeaders.Add("content-type", "application/json");
            // httpClient.DefaultRequestHeaders.Add("x-api-key", "CD6A2161F6C14D97AEF1"); 
            // Client = httpClient;
            _clientFactory = clientFactory;

            string filepath = @"inputfiles\iretaildb-4bac09deb4f6.json";
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", filepath);
            string projectId = "iretaildb";
            fireStoreDb = FirestoreDb.Create(projectId);


            _configuration = configuration;

        }
        public async Task<PeopleCountModel> GetPeopleCount(string videoPath)
        {
            try
            {

                List<string> _products = new List<string>() { "Apple", "Samsung", "Nokia", "Redmi" };
       
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

                    PeopleCountModel _result = new PeopleCountModel() { PeopleCount = _res.Peoples.Count, ProductName = _products[new Random().Next(3)] };

                    await fireStoreDb.Collection("SuggestionHistory").Document("peoplewatchcount").SetAsync(_result, SetOptions.Overwrite);

                    //for (int i = 1; i <= _result.NoOfPeople; i++)
                    //{
                    //    string peopleID = i.ToString("D3");
                    //    List<string> peopleObject = _res.Peoples[i - 1][$"person id: {peopleID}"].ToObject<List<string>>();

                    //    string duration = peopleObject.Where(x => x.StartsWith("duration appeared")).FirstOrDefault();
                    //    if (!string.IsNullOrEmpty(duration))
                    //    {
                    //        string seconds = duration.Split(':')[1];
                    //        _result.Appearing.Add(new PeopleModel() { PeopleID = peopleID, DurationAppeared = seconds });
                    //    }
                    //}



                    return _result;
                }
                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        private PeopleCountModel GetPeopleCountFromDB()
        {
            string filepath = @"inputfiles\iretaildb-4bac09deb4f6.json";
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", filepath);
            string projectId = "iretaildb";
            var fireStoreDb = FirestoreDb.Create(projectId);

            DocumentSnapshot snapshot = fireStoreDb.Collection("SuggestionHistory").Document("peoplewatchcount").GetSnapshotAsync().Result;

            if (snapshot.Exists)
            {
                PeopleCountModel _objects = snapshot.ConvertTo<PeopleCountModel>();
                return _objects;
            }


            return null;
        }

               /* await using (ServiceBusClient client = new ServiceBusClient(_configuration["Settings:AzureServiceBusConnectionString"]))
                {
                    // create a processor that we can use to process the messages
                    ServiceBusProcessor processor = client.CreateProcessor("messagetest1", new ServiceBusProcessorOptions());
*/

        public async Task<object> setSuggestion()
        {
            PeopleCountModel _peopleCount = GetPeopleCountFromDB();

            DocumentSnapshot snapshot = await fireStoreDb.Collection("SuggestionHistory").Document("productdataset").GetSnapshotAsync();

            if (snapshot.Exists && _peopleCount != null)
            {
                Dictionary<string, List<ProductModel>> _objects = snapshot.ConvertTo<Dictionary<string, List<ProductModel>>>();
                ProductModel _product = _objects["products"].Where(x => x.ProductName == _peopleCount.ProductName).FirstOrDefault();
                if (_product != null)
                {
                    Int64 nonBuyingPeople = _peopleCount.PeopleCount - _product.SalesCount;

                    decimal notBuyingPercentage = (nonBuyingPeople / _product.TotalCount) * 100;
                    if (notBuyingPercentage < 50)
                    {
                        decimal maxCashbackPrice = _product.Price - _product.OriginalPrice;
                        decimal suggestedCashback = maxCashbackPrice - 100;
                        string suggestion = $"{_peopleCount.ProductName} was watched by total of {_peopleCount.PeopleCount} people. But total sale for this product was {100 - notBuyingPercentage}% . If we provide CASHBACK of ${suggestedCashback} for this product then sales can improve";

                        AddToAzureMessageQueue(suggestion);
                    }
                }
            }
            return string.Empty;
        }

        private void AddToAzureMessageQueue(string _message)
        {
            _client = new QueueClient(_bus_connectionstring, _queue_name);
            var obj = new Message(Encoding.UTF8.GetBytes(_message.ToString()));
            _client.SendAsync(obj);
        }

        public List<string> GetMessages()
        {
            try
            {
                _messages.Clear();
                _client = new QueueClient(_configuration["Settings:AzureServiceBusConnectionString"], _queue_name);

                var _options = new MessageHandlerOptions(ExceptionReceived)
                {
                    MaxConcurrentCalls = 1,
                    AutoComplete = false
                };

                _client.RegisterMessageHandler(Process_Message, _options);

                Thread.Sleep(10000);
                return _messages;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        static async Task Process_Message(Message _message, CancellationToken _token)
        {
            string _msg = Encoding.UTF8.GetString(_message.Body);

            _messages.Add(_msg);

            await _client.CompleteAsync(_message.SystemProperties.LockToken);
        }

        static Task ExceptionReceived(ExceptionReceivedEventArgs args)
        {
            Console.WriteLine(args.Exception);
            return Task.CompletedTask;
        }
    }
}
