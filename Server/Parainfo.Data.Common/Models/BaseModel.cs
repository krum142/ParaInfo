using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;

namespace Parainfo.Data.Common.Models
{
    public abstract class BaseModel
    {
        public BaseModel()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public string Id { get; set; }

        public DateTime CreatedAt => DateTime.UtcNow;
    }
}
