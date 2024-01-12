using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ForecastService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ForecastController(ForecastDbContext forecastDbContext) : ControllerBase
    {
    
        [HttpGet]
        public IEnumerable<Forecast> Get()
        {
            return forecastDbContext.Forecasts.Include(f => f.ForecastsRow).ToList();
        }

        [HttpPost("ForecastRow")]
        public async Task<IActionResult> Post([FromBody] ForecastRow forecast)
        {
            var existingForecast = forecastDbContext.ForecastsRows.SingleOrDefault(f => f.Id == forecast.Id);

            if (existingForecast != null)
            {
                existingForecast.ForecastValue = forecast.ForecastValue;
            }else
            {
                forecastDbContext.ForecastsRows.Add(forecast);
            }

            await forecastDbContext.SaveChangesAsync();
            return Ok();

        }
    }
}
