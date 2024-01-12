using System.ComponentModel.DataAnnotations;

namespace ForecastService
{
    public class ForecastRow
    {
        public Guid Id { get; set; }

        public required Guid ForecastId { get; set; }

        [Range(0, 11)]
        public required int Month { get; set; }

        public required int ForecastValue { get; set; }
    }
}
