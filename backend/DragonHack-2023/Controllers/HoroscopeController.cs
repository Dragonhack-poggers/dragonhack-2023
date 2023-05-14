using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using HtmlAgilityPack;
using Microsoft.AspNetCore.Mvc;

namespace DragonHack_2023.Controllers;

/// <summary>
/// Handles requests related to horoscopes for different astrological signs.
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class HoroscopeController : ControllerBase
{
    // HttpClient instance to send HTTP requests.
    private static readonly HttpClient HttpClient = new();
    // Dictionary mapping astrological signs to their respective identifiers on the horoscope.com website.
    private static readonly Dictionary<string, int> Signs = new()
    {
        {"aries", 1},
        {"taurus", 2},
        {"gemini", 3},
        {"cancer", 4},
        {"leo", 5},
        {"virgo", 6},
        {"libra", 7},
        {"scorpio", 8},
        {"sagittarius", 9},
        {"capricorn", 10},
        {"aquarius", 11},
        {"pisces", 12},
    };
    
    /// <summary>
    /// Retrieves the daily horoscope for the provided astrological sign.
    /// </summary>
    /// <param name="sign">Astrological sign. Must be a valid sign (aries, taurus, gemini, etc.).</param>
    /// <returns>Daily horoscope for the provided astrological sign.</returns>
    [HttpGet("{sign}")]
    public async Task<IActionResult> GetHoroscope(string sign)
    {
        // Check if the provided sign is valid.
        if (!Signs.ContainsKey(sign))
        {
            return BadRequest("Invalid sign.");
        }
        
        // Send a GET request to the horoscope.com website to retrieve the horoscope for the provided sign.
        var url = $"https://www.horoscope.com/us/horoscopes/general/horoscope-general-daily-today.aspx?sign={Signs[sign]}";
        var response = await HttpClient.GetAsync(url);
        // If the request was not successful, return a BadRequest result.
        if (!response.IsSuccessStatusCode)
        {
            return BadRequest("Failed to retrieve data.");
        }
        
        // Parse the HTML response to extract the horoscope.
        var htmlDocument = new HtmlDocument();
        htmlDocument.LoadHtml(await response.Content.ReadAsStringAsync());
        
        // The horoscope is located within a <p> tag.
        var container = htmlDocument.DocumentNode.SelectSingleNode("//p");
        // Return the horoscope.
        return Ok(container.InnerText.Trim());
    }
}