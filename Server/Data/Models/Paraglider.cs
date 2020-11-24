using System;
using System.Collections.Generic;
using Parainfo.Data.Common.Models;
using ParaInfoServer.Attributes;

namespace Parainfo.Data.Models
{
    [BsonCollection("Paragliders")]
    public class Paraglider : BaseModel
    {
        public Paraglider()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public string Brand { get; set; }

        public string Model { get; set; }

        public decimal Price  { get; set; }

        public List<Size> Sizes { get; set; }
    }

    public class Size
    {
        public string WingSize { get; set; }

        public Areas Flat { get; set; }

        public Areas Proj { get; set; }

        public string Flattening { get; set; }

        public string UpperSurface { get; set; }

        public string UnderSurface { get; set; }

        public string NumberCells { get; set; }

        public string Weight { get; set; }

        public string Risers { get; set; }

        public string NakedPilot { get; set; }

        public string InflightWeight { get; set; }

        public string WingLoading { get; set; }

        public string MinSpeed { get; set; }

        public string TrimSpeed { get; set; }

        public string MaxSpeed { get; set; }

        public string MinSinkRate { get; set; }

        public string Certification { get; set; }

    }

    public class Areas
    {
        public double Area { get; set; }

        public double Span { get; set; }

        public double AspectRatio { get; set; }
    }
}