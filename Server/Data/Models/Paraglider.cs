using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Parainfo.Data.Common.Models;
using ParaInfoServer.Attributes;

namespace Parainfo.Data.Models
{
    [BsonCollection("Paragliders")]
    public class Paraglider : BaseModel
    {
        public Paraglider()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public string Brand { get; set; }

        public string Model { get; set; }

        public decimal Price  { get; set; }

        public string ImgUrl { get; set; }

        public IEnumerable<Size> Sizes { get; set; }
    }
}