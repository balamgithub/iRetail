
using iRetailService.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iRetailService.Gateway.Interface
{
    public interface iAPIClient
    {
        public Task<PeopleCountModel> GetPeopleCount(string videoPath);
        public List<string> GetMessages();
        public Task<object> setSuggestion();
    }
}
