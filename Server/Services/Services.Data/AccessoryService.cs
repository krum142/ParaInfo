using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using Parainfo.Data.Common.Repositories;
using Parainfo.Data.Models;
using ParaInfo.Web.ApiModels.Assesoar;
using ParaInfo.Web.ApiModels.Harness;
using Services.Services.Data.Interfaces;

namespace Services.Services.Data
{
    public class AccessoryService : IAccessoaryService
    {
        private readonly IMongoRepository<Accessory> mongoDb;
        private readonly ICloudinaryService cloudinaryService;

        public AccessoryService(IMongoRepository<Accessory> mongoDb, ICloudinaryService cloudinaryService)
        {
            this.mongoDb = mongoDb;
            this.cloudinaryService = cloudinaryService;
        }

        public async Task<IEnumerable<Accessory>> GetAllAsync()
        {
            return await mongoDb.GetAllAsync();
        }

        public async Task<IEnumerable<Accessory>> GetAllFilteredAsync()
        {
            var projection = Builders<Accessory>.Projection
                .Include(p => p.Model)
                .Include(x => x.ImgUrl)
                .Include(x => x.Brand)
                .Include(x => x.Views);

            return await mongoDb.GetAllFilteredAsync(projection);
        }

        public async Task<IEnumerable<Accessory>> GetAllByBrandFilteredAsync(string brand)
        {
            var projection = Builders<Accessory>.Projection
                .Include(p => p.Model)
                .Include(x => x.ImgUrl)
                .Include(x => x.Brand);

            return await mongoDb.GetAllFilteredByBrandAsync(x => x.Brand == brand, projection);
        }
        public async Task<Accessory> GetByIdAsync(string id)
        {
            return await mongoDb.FindByIdAsync(id);
        }

        public async Task<Accessory> GetByModelAndBrandAsync(string brand, string model)
        {
            var assessor = await mongoDb
                .FindOneAsync(x =>
                    x.Model.ToLower() == model.ToLower() &&
                    x.Brand.ToLower() == brand.ToLower());

            if (assessor == null) return assessor;

            assessor.Views++;
            await mongoDb.ReplaceOneAsync(assessor);
            return assessor;
        }

        public async Task<Accessory> GetByModelAsync(string model)
        {
            return await mongoDb.FindOneAsync(x => x.Model == model);
        }

        public async Task<Accessory> CreateAsync(AddAccesoarModel model)
        {
            if (await GetByModelAndBrandAsync(model.Brand, model.Model) != null)
            {
                return null;
            }

            var url = await cloudinaryService.UploadImageAsync(model.File);

            var harness = new Accessory()
            {
                Brand = model.Brand,
                Model = model.Model,
                Price = model.Price,
                Description = model.Description,
                ImgUrl = url.Url,
            };
            await mongoDb.InsertOneAsync(harness);
            return harness;

        }
        public async Task<Accessory> UpdateAsync(UpdateAccessoarModel model)
        {
            var oldParaglider = await GetByIdAsync(model.Id);
            var harness = new Accessory()
            {
                Id = model.Id,
                Brand = model.Brand,
                Model = model.Model,
                Price = model.Price,
                ImgUrl = oldParaglider.ImgUrl,
                Description = model.Description
            };

            if (model.File != null)
            {
                var url = await cloudinaryService.UploadImageAsync(model.File);
                harness.ImgUrl = url.Url;
            }
            return await mongoDb.ReplaceOneAsync(harness);
        }
        public async Task<Accessory> DeleteAsync(string id)
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