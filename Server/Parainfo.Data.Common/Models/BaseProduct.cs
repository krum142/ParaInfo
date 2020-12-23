using System.ComponentModel.DataAnnotations;

namespace Parainfo.Data.Common.Models
{
    public abstract class BaseProduct : BaseModel
    {
        [Required]
        public string Brand { get; set; }

        [Required]
        public string Model { get; set; }

        [Required]
        public string ImgUrl { get; set; }

        public decimal? Price { get; set; }

        public int Views { get; set; }
    }
}
