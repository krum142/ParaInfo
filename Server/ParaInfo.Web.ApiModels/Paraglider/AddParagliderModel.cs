using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Parainfo.Data.Models;

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
        public IFormFile File { get; set; }

        public decimal Price { get; set; }

        public IEnumerable<Size> Sizes { get; set; }
    }
}