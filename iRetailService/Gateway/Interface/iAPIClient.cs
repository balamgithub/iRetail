
using iRetailService.Model;
using System.Threading.Tasks;

namespace iRetailService.Gateway.Interface
{
    public interface iAPIClient
    {
        public Task<PeopleCountModel> GetPeopleCount(string videoPath);
    }
}
