using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Parainfo.Data.Common.Attributes;
using Parainfo.Data.Common.Models;
using Parainfo.Data.Models.Sizes;

namespace Parainfo.Data.Models
{
    [BsonCollection("Reserves")]
    public class Reserve : BaseProduct
    {
        [MaxLength(1000)]
        public string Description { get; set; }

        public IEnumerable<ReserveSize> Sizes { get; set; }
    }
}