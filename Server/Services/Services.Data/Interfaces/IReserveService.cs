using System.Collections.Generic;
using System.Threading.Tasks;
using Parainfo.Data.Models;
using ParaInfo.Web.ApiModels.Reserve;

namespace Services.Services.Data.Interfaces
{
    public interface IReserveService
    {
        public Task<Reserve> CreateAsync(AddReserveModel model);

        public Task<IEnumerable<Reserve>> GetAllAsync();

        public Task<IEnumerable<Reserve>> GetAllFilteredAsync();

        public Task<IEnumerable<Reserve>> GetAllByBrandFilteredAsync(string brand);

        public Task<Reserve> GetByIdAsync(string id);

        public Task<Reserve> GetByModelAndBrandAsync(string brand, string model);

        public Task<Reserve> GetByModelAsync(string name);

        public Task<Reserve> UpdateAsync(UpdateReserveModel model);

        public Task<Reserve> DeleteAsync(string id);
    }
}