using System.Text.Json.Serialization;

namespace DragonHack_2023.Models;

public class WeatherReturnClass
{
    /// <summary>
    /// forecast of the location
    /// </summary>
    [JsonPropertyName("forecast")]
    public string forecast { get; set; }
}