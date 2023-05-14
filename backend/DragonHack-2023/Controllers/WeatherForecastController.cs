using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using DragonHack_2023.Models;

namespace DragonHack_2023.Controllers;

// ApiController attribute indicates that this controller responds to web API requests.
// Route attribute specifies the route template.
[ApiController]
[Route("[controller]")]
public class WeatherForecastController : ControllerBase
{
    // Logger and HttpClientFactory are provided through dependency injection.
    private readonly ILogger<WeatherForecastController> _logger;
    private readonly IHttpClientFactory _clientFactory;

    // The constructor receives the dependencies through the parameters, which are injected by the ASP.NET Core dependency injection framework.
    public WeatherForecastController(ILogger<WeatherForecastController> logger, IHttpClientFactory clientFactory)
    {
        _logger = logger;
        _clientFactory = clientFactory;
    }

    /// <summary>
    /// Fetches weather forecast for the given latitude and longitude.
    /// </summary>
    /// <remarks>
    /// Sample request:
    ///
    ///     GET /WeatherForecast?latitude=46.04&longitude=14.46
    ///
    /// </remarks>
    /// <param name="latitude"></param>
    /// <param name="longitude"></param>
    /// <returns>A WeatherForecastClass object</returns>
    /// <response code="200">Returns the weather forecast object</response>
    /// <response code="500">If an error occurs</response> 
    [HttpGet]
    [ProducesResponseType(typeof(WeatherForecastClass), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [Produces("application/json")]
    public async Task<ActionResult<WeatherForecastClass>> Get(double latitude, double longitude)
    {
        // Create a HttpClient instance
        var client = _clientFactory.CreateClient();

        // Make a GET request to the external API
        var response = await client.GetAsync($"https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&current_weather=true");

        // If the request is successful
        if (response.IsSuccessStatusCode)
        {
            // Read the response content as a JSON string
            var json = await response.Content.ReadAsStringAsync();

            // Deserialize the JSON string into a WeatherForecastClass object
            var weatherForecast = JsonSerializer.Deserialize<WeatherForecastClass>(json);

            // Return the weather forecast with a 200 OK status
            return Ok(weatherForecast);
        }

        // If the request is not successful, log an error and return the status code from the external API
        _logger.LogError("Failed to retrieve weather forecast. Status Code: {ResponseStatusCode}", response.StatusCode);
        return StatusCode((int)response.StatusCode);
    }
}
