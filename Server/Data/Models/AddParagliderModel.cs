using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace Parainfo.Data.Models
{
    public class AddParagliderModel
    {
        public string Brand { get; set; }

        public string Model { get; set; }

        public IFormFile File { get; set; }

        public decimal Price { get; set; }

        public IEnumerable<Size> Sizes { get; set; }
    }
}