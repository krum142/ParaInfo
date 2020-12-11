

using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MongoDB.Driver;
using Parainfo.Data.Common.Models;

namespace Parainfo.Data.Common.Repositories
{
    public interface IMongoRepository<T> where T : BaseModel
    {
        IQueryable<T> AsQueryable();

        IEnumerable<T> FilterBy(
            Expression<Func<T, bool>> filterExpression);

        IEnumerable<TProjected> FilterBy<TProjected>(
            Expression<Func<T, bool>> filterExpression,
            Expression<Func<T, TProjected>> projectionExpression);

        T FindOne(Expression<Func<T, bool>> filterExpression);

        Task<T> FindOneAsync(Expression<Func<T, bool>> filterExpression);

        T FindById(string id);

        Task<T> FindByIdAsync(string id);

        Task<IEnumerable<T>> GetAllAsync();

        Task<IEnumerable<T>> GetAllFilteredAsync(ProjectionDefinition<T, T> projection);

        Task<IEnumerable<T>> GetAllFilteredByBrandAsync(Expression<Func<T, bool>> filterExpression,
            ProjectionDefinition<T, T> projection);

        Task<IEnumerable<T>> GetAllOrderByAsync(Expression<Func<T, object>> expression, int count);

        void InsertOne(T document);

        Task InsertOneAsync(T document);

        void InsertMany(ICollection<T> documents);

        Task InsertManyAsync(ICollection<T> documents);

        void ReplaceOne(T document);

        Task<T> ReplaceOneAsync(T document);

        void DeleteOne(Expression<Func<T, bool>> filterExpression);

        Task DeleteOneAsync(Expression<Func<T, bool>> filterExpression);

        void DeleteById(string id);

        Task DeleteByIdAsync(string id);

        void DeleteMany(Expression<Func<T, bool>> filterExpression);

        Task DeleteManyAsync(Expression<Func<T, bool>> filterExpression);
    }
}
