using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using Parainfo.Data.Common.Repositories;
using Parainfo.Data.Models;
using ParaInfo.Web.ApiModels.Harness;
using Services.Services.Data.Interfaces;

namespace Services.Services.Data
{
    public class HarnessService : IHarnessService
    {
        private readonly IMongoRepository<Harness> mongoDb;
        private readonly ICloudinaryService cloudinaryService;

        public HarnessService(IMongoRepository<Harness> mongoDb, ICloudinaryService cloudinaryService)
        {
            this.mongoDb = mongoDb;
            this.cloudinaryService = cloudinaryService;
        }

        public async Task<IEnumerable<Harness>> GetAllAsync()
        {
            return await mongoDb.GetAllAsync();
        }

        public async Task<IEnumerable<Harness>> GetAllFilteredAsync()
        {
            var projection = Builders<Harness>.Projection
                .Include(p => p.Model)
                .Include(x => x.ImgUrl)
                .Include(x => x.Brand)
                .Include(x => x.Views);

            return await mongoDb.GetAllFilteredAsync(projection);
        }

        public async Task<IEnumerable<Harness>> GetAllByBrandFilteredAsync(string brand)
        {
            var projection = Builders<Harness>.Projection
                .Include(p => p.Model)
                .Include(x => x.ImgUrl)
                .Include(x => x.Brand);

            return await mongoDb.GetAllFilteredAsync(x => x.Brand == brand, projection);
        }
        public async Task<Harness> GetByIdAsync(string id)
        {
            return await mongoDb.FindByIdAsync(id);
        }

        public async Task<Harness> GetByModelAndBrandAsync(string brand, string model)
        {
            var paraglider = await mongoDb
                .FindOneAsync(x =>
                    x.Model.ToLower() == model.ToLower() &&
                    x.Brand.ToLower() == brand.ToLower());

            if (paraglider == null) return paraglider;

            paraglider.Views++;
            await mongoDb.ReplaceOneAsync(paraglider);
            return paraglider;
        }

        public async Task<Harness> GetByModelAsync(string model)
        {
            return await mongoDb.FindOneAsync(x => x.Model == model);
        }

        public async Task<Harness> CreateAsync(AddHarnessModel model)
        {
            if (await GetByModelAndBrandAsync(model.Brand, model.Model) != null)
            {
                return null;
            }

            var url = await cloudinaryService.UploadImageAsync(model.File);

            var harness = new Harness()
            {
                Brand = model.Brand,
                Model = model.Model,
                Price = model.Price,
                Sizes = model.Sizes,
                Description = model.Description,
                ImgUrl = url.Url,
            };
            await mongoDb.InsertOneAsync(harness);
            return harness;

        }
        public async Task<Harness> UpdateAsync(UpdateHarnessModel model)
        {
            var oldParaglider = await GetByIdAsync(model.Id);
            var harness = new Harness()
            {
                Id = model.Id,
                Brand = model.Brand,
                Model = model.Model,
                Price = model.Price,
                Sizes = model.Sizes,
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
        public async Task<Harness> DeleteAsync(string id)
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