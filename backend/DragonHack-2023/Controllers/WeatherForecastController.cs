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
    public async Task<ActionResult<WeatherReturnClass>> Get(double latitude, double longitude)
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
        
            // Create a new WeatherReturnClass object
            var weatherReturn = new WeatherReturnClass();

            // Create an instance of WeatherCodeMapping and get the weather description
            var weatherCodeMapping = new WeatherCodeMapping();
            weatherReturn.forecast = weatherCodeMapping.GetWeatherCondition(weatherForecast.CurrentWeather.Weathercode.ToString("D2"));

            // Return the weather forecast with a 200 OK status
            return Ok(weatherReturn);
        }

        // If the request is not successful, log an error and return the status code from the external API
        _logger.LogError("Failed to retrieve weather forecast. Status Code: {ResponseStatusCode}", response.StatusCode);
        return StatusCode((int)response.StatusCode);
    }
}

public class WeatherCodeMapping
{
    public Dictionary<string, string> WeatherDictionary { get; set; }

    public WeatherCodeMapping()
    {
        WeatherDictionary = new Dictionary<string, string>
        {
            {"00", "Clear"},
            {"01", "Clear"},
            {"02", "Clear"},
            {"03", "Cloudy"},
            {"04", "Smoky"},
            {"05", "Hazy"},
            {"06", "Dusty"},
            {"07", "Windy"},
            {"08", "Dusty"},
            {"09", "Dusty"},
            {"10", "Misty"},
            {"11", "Foggy"},
            {"12", "Foggy"},
            {"13", "Lightning"},
            {"14", "Precipitation"},
            {"15", "Precipitation"},
            {"16", "Precipitation"},
            {"17", "Thunderstorm"},
            {"18", "Squalls"},
            {"19", "Funnel Cloud"},
            {"20", "Drizzle"},
            {"21", "Rainy"},
            {"22", "Snowy"},
            {"23", "Rain and Snow"},
            {"24", "Freezing Drizzle"},
            {"25", "Rain Showers"},
            {"26", "Snow Showers"},
            {"27", "Hail"},
            {"28", "Foggy"},
            {"29", "Thunderstorm"},
            {"30", "Duststorm"},
            {"31", "Duststorm"},
            {"32", "Duststorm"},
            {"33", "Severe Duststorm"},
            {"34", "Severe Duststorm"},
            {"35", "Severe Duststorm"},
            {"36", "Blowing Snow"},
            {"37", "Heavy Drifting Snow"},
            {"38", "Blowing Snow"},
            {"39", "Heavy Drifting Snow"},
            {"40", "Foggy"},
            {"41", "Foggy"},
            {"42", "Foggy"},
            {"43", "Foggy"},
            {"44", "Foggy"},
            {"45", "Foggy"},
            {"46", "Foggy"},
            {"47", "Foggy"},
            {"48", "Foggy"},
            {"49", "Foggy"},
            {"50", "Drizzle"},
            {"51", "Drizzle"},
            {"52", "Drizzle"},
            {"53", "Drizzle"},
            {"54", "Heavy Drizzle"},
            {"55", "Heavy Drizzle"},
            {"56", "Freezing Drizzle"},
            {"57", "Freezing Drizzle"},
            {"58", "Rain and Drizzle"},
            {"59", "Heavy Rain and Drizzle"},
            {"60", "Rainy"},
            {"61", "Rainy"},
            {"62", "Rainy"},
            {"63", "Rainy"},
            {"64", "Heavy Rain"},
            {"65", "Heavy Rain"},
            {"66", "Freezing Rain"},
            {"67", "Freezing Rain"},
            {"68", "Snow and Rain"},
            {"69", "Heavy Snow and Rain"},
            {"70", "Snowy"},
            {"71", "Snowy"},
            {"72", "Snowy"},
            {"73", "Snowy"},
            {"74", "Heavy Snow"},
            {"75", "Heavy Snow"},
            {"76", "Ice"},
            {"77", "Snowy"},
            {"78", "Snowy"},
            {"79", "Ice Pellets"},
            {"80", "Rain Showers"},
            {"81", "Rain Showers"},
            {"82", "Rain Showers"},
            {"83", "Snow and Rain Showers"},
            {"84", "Snow and Rain Showers"},
            {"85", "Snow Showers"},
            {"86", "Snow Showers"},
            {"87", "Snow and Rain Showers"},
            {"88", "Snow and Rain Showers"},
            {"89", "Hail"},
            {"90", "Hail"},
            {"91", "Rainy"},
            {"92", "Rainy"},
            {"93", "Snow and Rain"},
            {"94", "Snow and Rain"},
            {"95", "Thunderstorm"},
            {"96", "Thunderstorm"},
            {"97", "Thunderstorm"},
            {"98", "Duststorm"},
            {"99", "Thunderstorm"}
        };
    }

    public string GetWeatherCondition(string code)
    {
        if (WeatherDictionary.TryGetValue(code, out var weatherCondition))
        {
            return weatherCondition;
        }
        return "Unknown";
    }
}
