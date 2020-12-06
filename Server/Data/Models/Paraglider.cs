using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Parainfo.Data.Common.Attributes;
using Parainfo.Data.Common.Models;

namespace Parainfo.Data.Models
{
    [BsonCollection("Paragliders")]
    public class Paraglider : BaseModel
    {
        public Paraglider()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        [Required]
        public string Brand { get; set; }
        [Required]
        public string Model { get; set; }

        public decimal Price  { get; set; }
        [Required]
        public string ImgUrl { get; set; }

        public IEnumerable<Size> Sizes { get; set; }
    }
}