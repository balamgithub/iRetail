using Newtonsoft.Json;
using System.Collections.Generic;

namespace iRetailService.Model
{
    public class GetPredictionResponse
    {
        [JsonProperty(PropertyName = "counter")]
        public string Counter { get; set; }

        [JsonProperty(PropertyName = "likelihood of overestimation")]
        public string OverEstimation { get; set; }

        [JsonProperty(PropertyName = "likelihood of underestimation")]
        public string UnderEstimation { get; set; }

        [JsonProperty(PropertyName = "people")]
        public List<dynamic> Peoples { get; set; }
    }
}
