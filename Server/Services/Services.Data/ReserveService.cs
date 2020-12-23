using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using Parainfo.Data.Common.Repositories;
using Parainfo.Data.Models;
using ParaInfo.Web.ApiModels.Harness;
using ParaInfo.Web.ApiModels.Reserve;
using Services.Services.Data.Interfaces;

namespace Services.Services.Data
{
    public class ReserveService : IReserveService
    {
        private readonly IMongoRepository<Reserve> mongoDb;
        private readonly ICloudinaryService cloudinaryService;

        public ReserveService(IMongoRepository<Reserve> mongoDb, ICloudinaryService cloudinaryService)
        {
            this.mongoDb = mongoDb;
            this.cloudinaryService = cloudinaryService;
        }

        public async Task<IEnumerable<Reserve>> GetAllAsync()
        {
            return await mongoDb.GetAllAsync();
        }

        public async Task<IEnumerable<Reserve>> GetAllFilteredAsync()
        {
            var projection = Builders<Reserve>.Projection
                .Include(p => p.Model)
                .Include(x => x.ImgUrl)
                .Include(x => x.Brand)
                .Include(x => x.Views);

            return await mongoDb.GetAllFilteredAsync(projection);
        }

        public async Task<IEnumerable<Reserve>> GetAllByBrandFilteredAsync(string brand)
        {
            var projection = Builders<Reserve>.Projection
                .Include(p => p.Model)
                .Include(x => x.ImgUrl)
                .Include(x => x.Brand);

            return await mongoDb.GetAllFilteredAsync(x => x.Brand == brand, projection);
        }
        public async Task<Reserve> GetByIdAsync(string id)
        {
            return await mongoDb.FindByIdAsync(id);
        }

        public async Task<Reserve> GetByModelAndBrandAsync(string brand, string model)
        {
            var reserve = await mongoDb
                .FindOneAsync(x =>
                    x.Model.ToLower() == model.ToLower() &&
                    x.Brand.ToLower() == brand.ToLower());

            if (reserve == null) return reserve;

            reserve.Views++;
            await mongoDb.ReplaceOneAsync(reserve);
            return reserve;
        }

        public async Task<Reserve> GetByModelAsync(string model)
        {
            return await mongoDb.FindOneAsync(x => x.Model == model);
        }

        public async Task<Reserve> CreateAsync(AddReserveModel model)
        {
            if (await GetByModelAndBrandAsync(model.Brand, model.Model) != null)
            {
                return null;
            }

            var url = await cloudinaryService.UploadImageAsync(model.File);

            var harness = new Reserve()
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
        public async Task<Reserve> UpdateAsync(UpdateReserveModel model)
        {
            var oldParaglider = await GetByIdAsync(model.Id);
            var harness = new Reserve()
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
        public async Task<Reserve> DeleteAsync(string id)
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