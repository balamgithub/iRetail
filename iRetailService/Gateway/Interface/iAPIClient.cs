
using iRetailService.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace iRetailService.Gateway.Interface
{
    public interface iAPIClient
    {
        public Task<IEnumerable<PeopleCountModel>> GetPeopleCount(string videoPath);
    }
}
