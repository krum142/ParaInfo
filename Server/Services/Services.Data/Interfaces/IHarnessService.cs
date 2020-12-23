using System.Collections.Generic;
using System.Threading.Tasks;
using Parainfo.Data.Models;
using ParaInfo.Web.ApiModels.Harness;

namespace Services.Services.Data.Interfaces
{
    public interface IHarnessService
    {
        public Task<Harness> CreateAsync(AddHarnessModel model);

        public Task<IEnumerable<Harness>> GetAllAsync();

        public Task<IEnumerable<Harness>> GetAllFilteredAsync();

        public Task<IEnumerable<Harness>> GetAllByBrandFilteredAsync(string brand);

        public Task<Harness> GetByIdAsync(string id);

        public Task<Harness> GetByModelAndBrandAsync(string brand, string model);

        public Task<Harness> GetByModelAsync(string name);

        public Task<Harness> UpdateAsync(UpdateHarnessModel model);

        public Task<Harness> DeleteAsync(string id);
    }
}