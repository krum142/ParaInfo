using System.ComponentModel.DataAnnotations;
using Parainfo.Data.Common.Attributes;
using Parainfo.Data.Common.Models;

namespace Parainfo.Data.Models
{
    [BsonCollection("Brands")]
    public class Brand : BaseProduct
    {
        [Required]
        public string Name { get; set; }

        public string Description { get; set; }
    }
}