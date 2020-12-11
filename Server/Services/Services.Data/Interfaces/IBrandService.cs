using System.Collections.Generic;
using System.Threading.Tasks;
using Parainfo.Data.Models;

namespace Services.Services.Data.Interfaces
{
    public interface IBrandService
    {
        public Task<Brand> CreateAsync(Brand customer);

        public Task<IEnumerable<Brand>> GetAllAsync();

        public Task<Brand> GetByIdAsync(string id);

        public Task<Brand> GetByNameAsync(string name);

        public Task<Brand> UpdateAsync(Brand customer);

        public Task<Brand> DeleteAsync(string id);

        public Task<IEnumerable<Brand>> GetAFewOrderByViewsAsync(int count);
    }
}
