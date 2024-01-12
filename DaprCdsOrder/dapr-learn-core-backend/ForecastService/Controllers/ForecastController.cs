using Microsoft.AspNetCore.Mvc;

namespace ForecastService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ForecastController(ForecastDbContext forecastDbContext) : ControllerBase
    {
    
        [HttpGet]
        public IEnumerable<Forecast> Get()
        {
            return forecastDbContext.Forecasts.ToList();
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Forecast forecast)
        {
            var existingForecast = forecastDbContext.Forecasts.SingleOrDefault(f => f.Id == forecast.Id);

            if (existingForecast != null)
            {
                existingForecast.ForecastValue = forecast.ForecastValue;
            }else
            {
                forecastDbContext.Forecasts.Add(forecast);
            }

            await forecastDbContext.SaveChangesAsync();
            return Ok();

        }
    }
}
