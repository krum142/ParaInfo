using System;
using MongoDB.Bson;

namespace ParaInfo.Web.Documents
{
    public abstract class Document : IDocument
    {
        public ObjectId Id { get; set; }

        public DateTime CreatedAt => Id.CreationTime;
    }
}
