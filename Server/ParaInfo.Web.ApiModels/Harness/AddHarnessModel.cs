﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using Parainfo.Data.Models.Sizes;
using ParaInfo.Web.Infrastructure.ValidationAttributes;

namespace ParaInfo.Web.ApiModels.Harness
{
    public class AddHarnessModel
    {
        [Required]
        public string Brand { get; set; }
        [Required]
        public string Model { get; set; }

        [Required]
        [FileValidation]
        public IFormFile File { get; set; }

        [MaxLength(1000)]
        public string Description { get; set; }

        public decimal? Price { get; set; }

        public IEnumerable<HarnessSize> Sizes { get; set; }
    }
}