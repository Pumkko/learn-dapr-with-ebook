using Dapr.Client;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MyFrontEnd.Pages
{
    public class IndexModel(DaprClient daprClient) : PageModel
    {

        public async Task OnGet()
        {
            var forecasts = await daprClient.InvokeMethodAsync<IEnumerable<WeatherForecast>>(HttpMethod.Get, "MyBackend", "weatherForecast");
            ViewData["WeatherForecastData"] = forecasts;
        }
    }
}
