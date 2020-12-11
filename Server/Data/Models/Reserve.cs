using System;

using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Parainfo.Data.Common.Attributes;
using Parainfo.Data.Common.Models;
using Parainfo.Data.Models.Sizes;

namespace Parainfo.Data.Models
{
    [BsonCollection("Reserves")]
    public class Reserve : BaseModel
    {
        public Reserve()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        [Required]
        public string Brand { get; set; }
        [Required]
        public string Model { get; set; }

        [Required]
        public string ImgUrl { get; set; }

        [MaxLength(1000)]
        public string Description { get; set; }

        public decimal? Price { get; set; }

        public int Views { get; set; }

        public IEnumerable<ReserveSize> Sizes { get; set; }
    }
}