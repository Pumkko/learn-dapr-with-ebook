using Dapr.Client;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MyFrontEnd.Pages
{
    public class IndexModel(DaprClient _daprClient) : PageModel
    {

        public async Task OnGet()
        {
            var forecasts = await _daprClient.InvokeMethodAsync<IEnumerable<WeatherForecast>>(HttpMethod.Get, "MyBackEnd", "weatherforecast");
            ViewData["WeatherForecastData"] = forecasts;
        }
    }
}
