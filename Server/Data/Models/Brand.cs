

using System;
using System.ComponentModel.DataAnnotations;
using Parainfo.Data.Common.Attributes;
using Parainfo.Data.Common.Models;

namespace Parainfo.Data.Models
{
    [BsonCollection("Brands")]
    public class Brand : BaseModel
    {
        public Brand()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        [Required]
        public string Name { get; set; }

        public string ImageUrl { get; set; }

        public string Description { get; set; }

        public int Views { get; set; }
    }
}