using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using Parainfo.Data.Models.Sizes;
using ParaInfo.Web.Infrastructure.ValidationAttributes;

namespace ParaInfo.Web.ApiModels.Reserve
{
    public class UpdateReserveModel
    {
        [Required]
        public string Id { get; set; }

        [Required]
        [MaxLength(30)]
        public string Brand { get; set; }

        [Required]
        [MaxLength(30)]
        public string Model { get; set; }

        [FileValidation]
        public IFormFile File { get; set; }
        [MaxLength(1000)]
        public string Description { get; set; }

        public decimal? Price { get; set; }

        public IEnumerable<ReserveSize> Sizes { get; set; }
    }
}