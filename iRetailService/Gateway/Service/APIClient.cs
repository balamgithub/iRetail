using iRetailService.Gateway.Interface;
using iRetailService.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
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
        public async Task<IEnumerable<PeopleCountModel>> GetPeopleCount(string videoPath)
        {
            try
            {
                byte[] video = File.ReadAllBytes(Path.GetFullPath(@"C:\Users\balam\Documents\Bala\hackerearth\sentient\src\iRetail\samples\inputfiles\1_1_crop (online-video-cutter.com).mp4"));
                string inputVideo = Convert.ToBase64String(video, 0, video.Length);
                string inputVideoString = $"video_base64:" + inputVideo;

                var httpClient = _clientFactory.CreateClient();
                httpClient.DefaultRequestHeaders.Clear();
                httpClient.BaseAddress =new Uri("https://apis.sentient.io/");

                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                httpClient.DefaultRequestHeaders.Add("x-api-key", "CD6A2161F6C14D97AEF1");

                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, "/microservices/cv/peoplecounting/v0.1/getpredictions");
                request.Content = new StringContent(inputVideo, Encoding.UTF8, "application/json");//CONTENT-TYPE header
                var response = await httpClient.SendAsync(request).ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<IEnumerable<PeopleCountModel>>(result);
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
