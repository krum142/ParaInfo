using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using ParaInfo.Web.Infrastructure.ValidationAttributes;

namespace ParaInfo.Web.ApiModels.Assesoar
{
    public class UpdateAccessoarModel
    {
        [Required]
        public string Id { get; set; }

        [Required]
        public string Brand { get; set; }
        [Required]
        public string Model { get; set; }

        [FileValidation]
        public IFormFile File { get; set; }

        [MaxLength(1000)]
        public string Description { get; set; }

        public decimal? Price { get; set; }
    }
}