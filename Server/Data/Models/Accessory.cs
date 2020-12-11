using System;
using System.ComponentModel.DataAnnotations;
using Parainfo.Data.Common.Attributes;
using Parainfo.Data.Common.Models;

namespace Parainfo.Data.Models
{
    [BsonCollection("Accessories")]
    public class Accessory : BaseModel
    {
        public Accessory()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        [Required]
        public string Brand { get; set; }
        [Required]
        public string Model { get; set; }

        [Required]
        public string ImgUrl { get; set; }

        public decimal? Price { get; set; }

        public int Views { get; set; }

        [MaxLength(1000)]
        public string Description { get; set; }
    }
}