using Microsoft.AspNetCore.Http;
using MongoDB.Driver;
using Parainfo.Data.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace Services.Services.Data.Interfaces
{
    public interface IProductsService<T> where T : BaseProduct
    {
        public Task<IEnumerable<T>> GetAllAsync();

        public Task<IEnumerable<T>> GetAllAsync(ProjectionDefinition<T> projection);

        public Task<IEnumerable<T>> GetAllAsync(ProjectionDefinition<T> projection, Expression<Func<T, bool>> expression);

        public Task<IEnumerable<T>> GetAllAsync(ProjectionDefinition<T> projection, Expression<Func<T, object>> expression, int count);

        public Task<T> GetByIdAsync(string id);

        public Task<T> FindOneAsync(Expression<Func<T, bool>> expression);

        public Task AddViewAsync(T product);

        public Task<T> CreateAsync(T model, IFormFile file);

        public Task<T> UpdateAsync(T model, IFormFile file);

        public Task<T> DeleteAsync(string id);
    }
}
