using Dapr.Client;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MyFrontEnd.Pages
{
    public class IndexModel(DaprClient _daprClient) : PageModel
    {

        public async Task OnGet()
        {
            // It seems like there's a bootstrap problem. front-dapr needs the front end to start, however the first thing the front end does is calling Dapr. 
            // I tried to set up a correct startup order but i failed
            await Task.Delay(1000);

            var forecasts = await _daprClient.InvokeMethodAsync<IEnumerable<WeatherForecast>>(HttpMethod.Get, "MyBackEnd", "weatherforecast");
            ViewData["WeatherForecastData"] = forecasts;
        }
    }
}
