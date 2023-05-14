using System.Text.Json.Serialization;

namespace DragonHack_2023.Models;

public class WeatherForecastClass
{
    /// <summary>
    /// Latitude of the location
    /// </summary>
    /// <example>46.04</example>
    [JsonPropertyName("latitude")]
    public double Latitude { get; set; }
    
    /// <summary>
    ///  Longitude of the location
    ///  </summary>
    ///  <example>14.46</example>
    [JsonPropertyName("longitude")]
    public double Longitude { get; set; }
    
    /// <summary>
    /// Time it took to generate the forecast in milliseconds
    /// </summary>
    /// <example>0.27489662170410156</example>
    [JsonPropertyName("generationtime_ms")]
    public double GenerationtimeMs { get; set; }
    
    /// <summary>
    ///  UTC offset in seconds
    /// </summary>
    /// <example>0</example>
    [JsonPropertyName("utc_offset_seconds")]
    public int UtcOffsetSeconds { get; set; }
    
    /// <summary>
    /// Timezone of the location
    /// </summary>
    /// <example>GMT</example>
    [JsonPropertyName("timezone")]
    public string? Timezone { get; set; }
    
    /// <summary>
    ///  Timezone abbreviation of the location
    /// </summary>
    /// <example>GMT</example>
    [JsonPropertyName("timezone_abbreviation")]
    public string? TimezoneAbbreviation { get; set; }
    
    /// <summary>
    ///  Elevation of the location in meters
    /// </summary>
    /// <example>314</example>
    [JsonPropertyName("elevation")]
    public double Elevation { get; set; }
    
    /// <summary>
    ///  Current weather forecast
    /// </summary>
    [JsonPropertyName("current_weather")]
    public CurrentWeatherClass? CurrentWeather { get; set; }
}
