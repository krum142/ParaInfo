using System;
using System.Security.Cryptography;
using MongoDB.Bson;
using MongoDB.Data.Documents;
using ParaInfoServer.Attributes;

namespace ParaInfoServer.Models
{
    [BsonCollection("Items")]
    public class ItemModel : Document
    {
        public ItemModel()
        {
            this.Id = new ObjectId(new Random().Next(int.MinValue,Int32.MaxValue) + "1.24"); // krum was Drunk please delete the hole project
        }

        public decimal Price { get; set; }
    }
}