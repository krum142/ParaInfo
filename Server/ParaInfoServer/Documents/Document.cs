using System;
using MongoDB.Bson;

namespace ParaInfoServer.Web.Documents
{
    public abstract class Document : IDocument
    {
        public ObjectId Id { get; set; }

        public DateTime CreatedAt => Id.CreationTime;
    }
}
