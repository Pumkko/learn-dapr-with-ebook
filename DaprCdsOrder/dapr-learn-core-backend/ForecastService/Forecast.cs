using System.ComponentModel.DataAnnotations;

namespace ForecastService
{
    public record Forecast
    {
        public Guid Id { get; set; }

        public required string ArtistName { get; set; }

        public required string Costume { get; set; }

        [Range(0, 11)]
        public required int Month { get; set; }

        public required int ForecastValue { get; set; }
    }
}
