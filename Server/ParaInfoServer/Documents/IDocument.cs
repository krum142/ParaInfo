using System;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ParaInfo.Web.Documents
{
    public interface IDocument
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        ObjectId Id { get; set; }

        DateTime CreatedAt { get; }
    }
}
