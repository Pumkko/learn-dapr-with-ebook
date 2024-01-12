namespace ForecastService
{
    public record Forecast
    {
        public required string ArtistName { get; set; }

        public required string Costume { get; set; }

        public required int Month { get; set; }

        public required int ForecastValue { get; set; }
    }
}
