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

namespace iRetailService.Gateway.Service
{
    public class APIClient : iAPIClient
    {
        //public HttpClient Client { get; }
        private readonly IHttpClientFactory _clientFactory;

        public APIClient(IHttpClientFactory clientFactory)
        {
            // httpClient.BaseAddress = new Uri("https://apis.sentient.io/microservices/cv/peoplecounting/");
            //// httpClient.DefaultRequestHeaders.Add("content-type", "application/json");
            // httpClient.DefaultRequestHeaders.Add("x-api-key", "CD6A2161F6C14D97AEF1"); 
            // Client = httpClient;
            _clientFactory = clientFactory;

        }
        public async Task<PeopleCountModel> GetPeopleCount(string videoPath)
        {
            try
            {
                byte[] video = File.ReadAllBytes(Path.GetFullPath(@"D:\Prakash\Personal\Git\STreeIRetail\samples\inputfiles\1_1_crop (online-video-cutter.com).mp4"));
                string inputVideo = Convert.ToBase64String(video, 0, video.Length);
                var reqInput = new InputRequest() { video_base64 = inputVideo };

                var httpClient = _clientFactory.CreateClient();
                httpClient.BaseAddress = new Uri("https://apis.sentient.io/");
                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                httpClient.DefaultRequestHeaders.Add("x-api-key", "CD6A2161F6C14D97AEF1");


                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "microservices/cv/peoplecounting/v0.1/getpredictions");
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
    }

}
