using iRetailService.Gateway.Interface;
using iRetailService.Model;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace iRetailService.controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleCountController : ControllerBase
    {
        private readonly iAPIClient iAPIClient;
        public PeopleCountController(iAPIClient apiClient)
        {
            iAPIClient = apiClient;
        }

        [HttpGet]
        public async Task<PeopleCountModel> Get()
        {
            var response = await iAPIClient.GetPeopleCount("");
            return response;
        }
    }
}
