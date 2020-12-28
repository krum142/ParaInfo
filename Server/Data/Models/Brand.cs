using System.ComponentModel.DataAnnotations;
using Parainfo.Data.Common.Attributes;
using Parainfo.Data.Common.Models;

namespace Parainfo.Data.Models
{
    [BsonCollection("Brands")]
    public class Brand : BaseModel
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string ImgUrl { get; set; }

        public string Description { get; set; }

        public int Views { get; set; }
    }
}