


using System.Collections.Generic;
using System.Threading.Tasks;
using Parainfo.Data.Common.Repositories;
using Parainfo.Data.Models;
using Services.Services.Data.Interfaces;

namespace Services.Services.Data
{
    public class BrandService: IBrandService
    {
        private readonly IMongoRepository<Brand> mongoDb;

        public BrandService(IMongoRepository<Brand> mongoDb)
        {
            this.mongoDb = mongoDb;
        }
        public async Task<IEnumerable<Brand>> GetAllAsync()
        {
            return await mongoDb.GetAllAsync();
        }
        public async Task<Brand> GetByIdAsync(string id)
        {
            return await mongoDb.FindByIdAsync(id);
        }

        public async Task<Brand> GetByNameAsync(string name)
        {
            return await mongoDb.FindOneAsync(x => x.Name == name);
        }

        public async Task<Brand> CreateAsync(Brand customer)
        {
            await mongoDb.InsertOneAsync(customer);
            return customer;
        }
        public async Task<Brand> UpdateAsync(Brand customer)
        {
           return await mongoDb.ReplaceOneAsync(customer);
        }
        public async Task<Brand> DeleteAsync(string id)
        {
            var item = await mongoDb.FindByIdAsync(id);
            if (item != null)
            {
                await mongoDb.DeleteOneAsync(c => c.Id == item.Id);
                return item;
            }

            return null;
        }

    }
}
