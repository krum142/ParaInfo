using System.ComponentModel.DataAnnotations;

namespace Parainfo.Data.Models
{
    public class Size
    {
        [MaxLength(20)]
        public string WingSize { get; set; }

        public Areas Flat { get; set; }

        public Areas Proj { get; set; }

        [MaxLength(20)]
        public string Flattening { get; set; }
        [MaxLength(20)]
        public string UpperSurface { get; set; }
        [MaxLength(20)]
        public string UnderSurface { get; set; }
        [MaxLength(20)]
        public string NumberCells { get; set; }
        [MaxLength(20)]
        public string Weight { get; set; }
        [MaxLength(20)]
        public string Risers { get; set; }
        [MaxLength(20)]
        public string NakedPilot { get; set; }
        [MaxLength(20)]
        public string InflightWeight { get; set; }
        [MaxLength(20)]
        public string WingLoading { get; set; }
        [MaxLength(20)]
        public string MinSpeed { get; set; }
        [MaxLength(20)]
        public string TrimSpeed { get; set; }
        [MaxLength(20)]
        public string MaxSpeed { get; set; }
        [MaxLength(20)]
        public string MinSinkRate { get; set; }
        [MaxLength(20)]
        public string Certification { get; set; }

    }
}