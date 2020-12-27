using iRetailService.Gateway.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace iRetailService.controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuggestionController : ControllerBase
    {
        private readonly iAPIClient iAPIClient;
        public SuggestionController(iAPIClient apiClient)
        {
            iAPIClient = apiClient;
        }

        [HttpGet]
        public async Task<object> Get()
        {
            var response = await iAPIClient.setSuggestion();
            return response;
        }
    }
}
