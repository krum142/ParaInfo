using System.ComponentModel.DataAnnotations;

namespace Parainfo.Data.Models
{
    public class Areas
    {
        [MaxLength(20)]
        public string Area { get; set; }
        [MaxLength(20)]
        public string Span { get; set; }
        [MaxLength(20)]
        public string AspectRatio { get; set; }
    }
}