using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Parainfo.Data.Models;
using ParaInfo.Web.Infrastructure.ValidationAttributes;

namespace ParaInfo.Web.ApiModels.Paraglider
{
    public class AddParagliderModel
    {
        [Required]
        [MaxLength(30)]
        public string Brand { get; set; }

        [Required]
        [MaxLength(30)]
        public string Model { get; set; }

        [Required]
        [FileValidation]
        public IFormFile File { get; set; }
        [MaxLength(1000)]
        public string Description { get; set; }

        public decimal Price { get; set; }

        public IEnumerable<Size> Sizes { get; set; }
    }
}