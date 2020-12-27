using iRetailService.Gateway.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace iRetailService.controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class iRetailWebController : Controller
    {
        private readonly iAPIClient iAPIClient;
        public iRetailWebController(iAPIClient apiClient)
        {
            iAPIClient = apiClient;
        }

        [HttpGet]
        public List<string> Get()
        {
            var response = iAPIClient.GetMessages();
            return response;
        }
    }
}
