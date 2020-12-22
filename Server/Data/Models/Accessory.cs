using System;
using System.ComponentModel.DataAnnotations;
using Parainfo.Data.Common.Attributes;
using Parainfo.Data.Common.Models;

namespace Parainfo.Data.Models
{
    [BsonCollection("Accessories")]
    public class Accessory : BaseProduct
    {
        [MaxLength(1000)]
        public string Description { get; set; }
    }
}