using System.Text.Json.Serialization;
namespace DragonHack_2023.Models;

/// <summary>
/// Class representing the current weather forecast
/// </summary>
public class CurrentWeatherClass
{
    /// <summary>
    /// Current temperature
    /// </summary>
    /// <example>20.5</example>
    [JsonPropertyName("temperature")]
    public double Temperature { get; set; }

    /// <summary>
    /// Current wind speed
    /// </summary>
    /// <example>5.2</example>
    [JsonPropertyName("windspeed")]
    public double Windspeed { get; set; }

    /// <summary>
    /// Current wind direction
    /// </summary>
    /// <example>180</example>
    [JsonPropertyName("winddirection")]
    public double Winddirection { get; set; }

    /// <summary>
    /// Weather code representing the current weather condition
    /// </summary>
    /// <example>100</example>
    [JsonPropertyName("weathercode")]
    public int Weathercode { get; set; }

    /// <summary>
    /// Represents whether it is day or not. 1 for day, 0 for night.
    /// </summary>
    /// <example>1</example>
    [JsonPropertyName("is_day")]
    public int Is_Day { get; set; }

    /// <summary>
    /// Time of the current weather data
    /// </summary>
    /// <example>"2023-05-13T14:35:00"</example>
    [JsonPropertyName("time")]
    public string Time { get; set; } 
}