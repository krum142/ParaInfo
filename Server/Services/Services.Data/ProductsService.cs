using Microsoft.AspNetCore.Http;
using MongoDB.Driver;
using Parainfo.Data.Common.Models;
using Parainfo.Data.Common.Repositories;
using Services.Services.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Services.Services.Data
{
    public class ProductsService<T> : IItemsService
        where T : BaseProduct
    {
        private readonly IMongoRepository<T> mongoDb;
        private readonly ICloudinaryService cloudinaryService;

        public ProductsService(IMongoRepository<T> mongoDb, ICloudinaryService cloudinaryService)
        {
            this.mongoDb = mongoDb;
            this.cloudinaryService = cloudinaryService;
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await mongoDb.GetAllAsync();
        }

        public async Task<IEnumerable<T>> GetAllFilteredAsync(ProjectionDefinition<T> projection)
        {
            return await mongoDb.GetAllFilteredAsync(projection);
        }

        public async Task<IEnumerable<T>> GetAllByBrandFilteredAsync(Expression<Func<T,bool>> expression, ProjectionDefinition<T> projection)
        {
            return await mongoDb.GetAllFilteredAsync(expression, projection);
        }
        public async Task<T> GetByIdAsync(string id)
        {
            return await mongoDb.FindByIdAsync(id);
        }

        public async Task<IEnumerable<T>> GetAllOrderedAndFilteredAsync(ProjectionDefinition<T> projection, Expression<Func<T, object>> expression, int count)
        {
            return await mongoDb.GetAllOrderedAndFilteredAsync(projection, expression, count);
        }

        public async Task<T> GetByExpressionAsync(Expression<Func<T,bool>> expression)
        {
            return await mongoDb.FindOneAsync(expression);
        }

        public async Task<T> CreateAsync(T model, IFormFile file)
        {
            if (await GetByExpressionAsync(x => x.Brand == model.Brand && x.Model == model.Model) != null)
            {
                return null;
            }

            var url = await cloudinaryService.UploadImageAsync(file);

            model.ImgUrl = url.Url;

            await mongoDb.InsertOneAsync(model);
            return model;

        }
        public async Task<T> UpdateAsync(T model, IFormFile file)
        {
            var oldProduct = await GetByIdAsync(model.Id);

            model.ImgUrl = oldProduct.ImgUrl;

            if (file != null)
            {
                var url = await cloudinaryService.UploadImageAsync(file);
                model.ImgUrl = url.Url;
            }
            
            return await mongoDb.ReplaceOneAsync(model);
        }
        public async Task<T> DeleteAsync(string id)
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
