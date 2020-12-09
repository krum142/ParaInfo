using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using Parainfo.Data.Common.Repositories;
using Parainfo.Data.Models;
using ParaInfo.Web.ApiModels.Paraglider;
using Services.Services.Data.Interfaces;

namespace Services.Services.Data
{
    public class ParagliderService : IParagliderService
    {
        private readonly IMongoRepository<Paraglider> mongoDb;
        private readonly ICloudinaryService cloudinaryService;

        public ParagliderService(IMongoRepository<Paraglider> mongoDb, ICloudinaryService cloudinaryService)
        {
            this.mongoDb = mongoDb;
            this.cloudinaryService = cloudinaryService;
        }

        public async Task<IEnumerable<Paraglider>> GetAllAsync()
        {
            return await mongoDb.GetAllAsync();
        }

        public async Task<IEnumerable<Paraglider>> GetAllFilteredAsync()
        {
            var projection = Builders<Paraglider>.Projection
                .Include(p => p.Model)
                .Include(x => x.ImgUrl)
                .Include(x => x.Brand)
                .Include(x => x.Views);

            return await mongoDb.GetAllFilteredAsync(projection);
        }

        public async Task<IEnumerable<Paraglider>> GetAllByBrandFilteredAsync(string brand)
        {
            var projection = Builders<Paraglider>.Projection
                .Include(p => p.Model)
                .Include(x => x.ImgUrl)
                .Include(x => x.Brand);

            return await mongoDb.GetAllFilteredByBrandAsync(x => x.Brand == brand, projection);
        }
        public async Task<Paraglider> GetByIdAsync(string id)
        {
            return await mongoDb.FindByIdAsync(id);
        }

        public async Task<Paraglider> GetByModelAndBrandAsync(string brand, string model)
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

        public async Task<Paraglider> GetByModelAsync(string model)
        {
            return await mongoDb.FindOneAsync(x => x.Model == model);
        }

        public async Task<Paraglider> CreateAsync(AddParagliderModel model)
        {
            if (await GetByModelAndBrandAsync(model.Brand, model.Model) != null)
            {
                return null;
            }

            var url = await cloudinaryService.UploadImageAsync(model.File);

            var paraglider = new Paraglider
            {
                Brand = model.Brand,
                Model = model.Model,
                Price = model.Price,
                Sizes = model.Sizes,
                Description = model.Description,
                ImgUrl = url.Url,
            };
            await mongoDb.InsertOneAsync(paraglider);
            return paraglider;

        }
        public async Task<Paraglider> UpdateAsync(UpdateParagliderModel model)
        {
            var oldParaglider = await GetByIdAsync(model.Id);
            var paraglider = new Paraglider
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
                paraglider.ImgUrl = url.Url;
            }
            return await mongoDb.ReplaceOneAsync(paraglider);
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