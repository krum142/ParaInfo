using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Parainfo.Data.Common.Attributes;
using Parainfo.Data.Common.Models;
using Parainfo.Data.Models.Sizes;

namespace Parainfo.Data.Models
{
    [BsonCollection("Harnesses")]
    public class Harness : BaseProduct
    {
        [MaxLength(1000)]
        public string Description { get; set; }

        public IEnumerable<HarnessSize> Sizes { get; set; }
    }
}