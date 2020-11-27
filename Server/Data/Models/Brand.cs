using System;
using Parainfo.Data.Common.Models;
using ParaInfoServer.Attributes;

namespace Parainfo.Data.Models
{
    [BsonCollection("Brands")]
    public class Brand : BaseModel
    {
        public Brand()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public string Name { get; set; }

        public string ImageUrl { get; set; }
    }
}