using System.Collections.Generic;
using System.Threading.Tasks;
using Parainfo.Data.Common.Repositories;
using Parainfo.Data.Models;
using Services.Services.Data.Interfaces;

namespace Services.Services.Data
{
    public class ParagliderService : IParagliderService
    {
        private readonly IMongoRepository<Paraglider> mongoDb;

        public ParagliderService(IMongoRepository<Paraglider> mongoDb)
        {
            this.mongoDb = mongoDb;
        }
        public async Task<IEnumerable<Paraglider>> GetAllAsync()
        {
            return await mongoDb.GetAllAsync();
        }
        public async Task<Paraglider> GetByIdAsync(string id)
        {
            return await mongoDb.FindByIdAsync(id);
        }

        public async Task<Paraglider> GetByModelAndBrandAsync(string brand, string model)
        {
            return await mongoDb.FindOneAsync(x => x.Model.ToLower() == model.ToLower() && x.Brand.ToLower() == brand.ToLower());
        }

        public async Task<Paraglider> GetByModelAsync(string model)
        {
            return await mongoDb.FindOneAsync(x => x.Model == model);
        }

        public async Task<Paraglider> CreateAsync(Paraglider customer)
        {
            await mongoDb.InsertOneAsync(customer);
            return customer;
        }
        public async Task<Paraglider> UpdateAsync(Paraglider customer)
        {
            return await mongoDb.ReplaceOneAsync(customer);
        }
        public async Task<Paraglider> DeleteAsync(string id)
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