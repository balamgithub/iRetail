using iRetailService.Gateway.Interface;
using iRetailService.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public async Task<IEnumerable<PeopleCountModel>> Get()
        {
            var response = await iAPIClient.GetPeopleCount("");
            return response;
        }
    }
}
