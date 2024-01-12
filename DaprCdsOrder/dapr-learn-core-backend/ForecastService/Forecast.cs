using System.ComponentModel.DataAnnotations;

namespace ForecastService
{
    public record Forecast
    {
        public Guid Id { get; set; }

        public required string ArtistName { get; set; }

        public required string Costume { get; set; }

        public required IEnumerable<ForecastRow> ForecastsRow { get; set; }
    }
}
