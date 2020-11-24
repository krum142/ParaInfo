using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Services.Data.Interfaces
{
    public interface IItemsService<T>
    {
        public Task<T> CreateAsync(T customer);

        public Task<IEnumerable<T>> GetAllAsync();

        public Task<T> GetByIdAsync(string id);

        public Task UpdateAsync(T customer);

        public Task DeleteAsync(string id);
    }
}
