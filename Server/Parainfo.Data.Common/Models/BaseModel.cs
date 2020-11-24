using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Parainfo.Data.Common.Models
{
    public abstract class BaseModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public ObjectId Id { get; set; }

        public DateTime CreatedAt => DateTime.UtcNow;
    }
}
