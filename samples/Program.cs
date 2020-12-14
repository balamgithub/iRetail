using Newtonsoft.Json;
using RestSharp;
using System;
using System.IO;

namespace samples
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                Console.WriteLine("Hello World!");
                byte[] video = File.ReadAllBytes(Path.GetFullPath(@"C:\Users\balam\Documents\Bala\hackerearth\sentient\src\iRetail\samples\inputfiles\1_1_crop (online-video-cutter.com).mp4"));
                string inputVideo = Convert.ToBase64String(video, 0, video.Length);
                var client = new RestClient("https://apis.sentient.io/microservices/cv/peoplecounting/v0.1/getpredictions");
                var request = new RestRequest(Method.POST);
                request.AddHeader("content-type", "application/json");
                request.AddHeader("x-api-key", "CD6A2161F6C14D97AEF1");
                request.AddParameter("application/json", "{\"video_base64\":" + inputVideo + "}", ParameterType.RequestBody);
                IRestResponse response = client.Execute(request);
                Console.WriteLine(JsonConvert.SerializeObject(response));
            }catch(Exception ex)
            {
                throw ex;
            }
        }
    }
}
