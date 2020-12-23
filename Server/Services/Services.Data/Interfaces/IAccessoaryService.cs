using System.Collections.Generic;
using System.Threading.Tasks;
using Parainfo.Data.Models;
using ParaInfo.Web.ApiModels.Assesoar;
using ParaInfo.Web.ApiModels.Reserve;

namespace Services.Services.Data.Interfaces
{
    public interface IAccessoaryService
    {
        public Task<Accessory> CreateAsync(AddAccesoarModel model);

        public Task<IEnumerable<Accessory>> GetAllAsync();

        public Task<IEnumerable<Accessory>> GetAllFilteredAsync();

        public Task<IEnumerable<Accessory>> GetAllByBrandFilteredAsync(string brand);

        public Task<Accessory> GetByIdAsync(string id);

        public Task<Accessory> GetByModelAndBrandAsync(string brand, string model);

        public Task<Accessory> GetByModelAsync(string name);

        public Task<Accessory> UpdateAsync(UpdateAccessoarModel model);

        public Task<Accessory> DeleteAsync(string id);
    }
}