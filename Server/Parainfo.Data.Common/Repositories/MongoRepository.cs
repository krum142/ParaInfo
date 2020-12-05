﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Parainfo.Data.Common.Models;
using Parainfo.Data.Configs;
using ParaInfoServer.Attributes;

namespace Parainfo.Data.Common.Repositories
{
    public class MongoRepository<T> : IMongoRepository<T>
        where T : BaseModel
    {
        private readonly IMongoCollection<T> _collection;
        public MongoRepository(IOptions<DatabaseConfiguration> settings)
        {
            var keys = settings.Value;
            var database = new MongoClient(keys.ConnectionString).GetDatabase(keys.DatabaseName);
            _collection = database.GetCollection<T>(GetCollectionName(typeof(T)));
        }

        private protected string GetCollectionName(Type documentType)
        {
            var z = ((BsonCollectionAttribute)documentType.GetCustomAttributes(
                    typeof(BsonCollectionAttribute),
                    true)
                .FirstOrDefault())?.CollectionName;
            return z;
        }

        public virtual IQueryable<T> AsQueryable()
        {
            return _collection.AsQueryable();
        }


        public virtual IEnumerable<T> FilterBy(
            Expression<Func<T, bool>> filterExpression)
        {
            return _collection.Find(filterExpression).ToEnumerable();
        }

        public virtual IEnumerable<TProjected> FilterBy<TProjected>(
            Expression<Func<T, bool>> filterExpression,
            Expression<Func<T, TProjected>> projectionExpression)
        {
            return _collection.Find(filterExpression).Project(projectionExpression).ToEnumerable();
        }


        public virtual T FindOne(Expression<Func<T, bool>> filterExpression)
        {
            return _collection.Find(filterExpression).FirstOrDefault();
        }

        public virtual Task<T> FindOneAsync(Expression<Func<T, bool>> filterExpression)
        {
            return Task.Run(() => _collection.Find(filterExpression).FirstOrDefaultAsync());
        }

        public virtual T FindById(string id)
        {
            var filter = Builders<T>.Filter.Eq(doc => doc.Id, id);
            return _collection.Find(filter).SingleOrDefault();
        }

        public virtual Task<T> FindByIdAsync(string id)
        {
            return Task.Run(() =>
            {
                var filter = Builders<T>.Filter.Eq(doc => doc.Id, id);
                return _collection.Find(filter).SingleOrDefaultAsync();
            });
        }

        public virtual void InsertOne(T document)
        {
            _collection.InsertOne(document);
        }

        public virtual Task InsertOneAsync(T document)
        {
            return Task.Run(() => _collection.InsertOneAsync(document));
        }

        public void InsertMany(ICollection<T> documents)
        {
            _collection.InsertMany(documents);
        }


        public virtual async Task InsertManyAsync(ICollection<T> documents)
        {
            await _collection.InsertManyAsync(documents);
        }

        public virtual async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _collection.Find(_ => true).ToListAsync();
        }


        public void ReplaceOne(T document)
        {
            var filter = Builders<T>.Filter.Eq(doc => doc.Id, document.Id);
            _collection.FindOneAndReplace(filter, document);
        }

        public virtual async Task<T> ReplaceOneAsync(T document)
        {
            var options = new FindOneAndReplaceOptions<T>
            {
                ReturnDocument = ReturnDocument.After
            };
            var z = await _collection.FindOneAndReplaceAsync<T>(u => u.Id == document.Id, document, options);
            return z;
        }

        public void DeleteOne(Expression<Func<T, bool>> filterExpression)
        {
            _collection.FindOneAndDelete(filterExpression);
        }

        public Task DeleteOneAsync(Expression<Func<T, bool>> filterExpression)
        {
            return Task.Run(() => _collection.FindOneAndDeleteAsync(filterExpression));
        }

        public void DeleteById(string id)
        {
            var filter = Builders<T>.Filter.Eq(doc => doc.Id, id);
            _collection.FindOneAndDelete(filter);
        }

        public Task DeleteByIdAsync(string id)
        {
            return Task.Run(() =>
            {
                var filter = Builders<T>.Filter.Eq(doc => doc.Id, id);
                _collection.FindOneAndDeleteAsync(filter);
            });
        }

        public void DeleteMany(Expression<Func<T, bool>> filterExpression)
        {
            _collection.DeleteMany(filterExpression);
        }

        public Task DeleteManyAsync(Expression<Func<T, bool>> filterExpression)
        {
            return Task.Run(() => _collection.DeleteManyAsync(filterExpression));
        }
    }
}
