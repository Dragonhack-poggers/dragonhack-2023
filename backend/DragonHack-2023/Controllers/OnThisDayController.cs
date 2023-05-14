using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Collections.Generic;
using DragonHack_2023.Models;
using System.Net.Http.Json;

namespace DragonHack_2023.Controllers;

/// <summary>
/// Controller for handling requests related to historical events on a given day.
/// </summary>
[ApiController]
[Route("[controller]")]
public class OnThisDayController : ControllerBase
{
    private readonly ILogger<OnThisDayController> _logger;
    private readonly IHttpClientFactory _clientFactory;
    
    /// <summary>
    /// Constructor for the OnThisDayController.
    /// </summary>
    /// <param name="logger">An instance of ILogger used for logging.</param>
    /// <param name="clientFactory">An instance of IHttpClientFactory for creating HttpClient instances.</param>
    public OnThisDayController(ILogger<OnThisDayController> logger, IHttpClientFactory clientFactory)
    {
        _logger = logger;
        _clientFactory = clientFactory;
    }
    
    /// <summary>
    /// GET endpoint that returns historical events for a given day.
    /// </summary>
    /// <param name="month">The month of the events.</param>
    /// <param name="day">The day of the events.</param>
    /// <param name="numberOfEvents">The number of events to return. Default is 5.</param>
    /// <returns>A list of historical events for the given day.</returns>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<EventSummary>>> Get(int month, int day, int numberOfEvents = 5)
    {
        var client = _clientFactory.CreateClient();
        var response = await client.GetAsync($"https://byabbe.se/on-this-day/{month}/{day}/events.json");

        if (response.IsSuccessStatusCode)
        {
            var onThisDayResponse = await response.Content.ReadFromJsonAsync<OnThisDayResponse>();

            // Use LINQ to randomly select up to numberOfEvents events and map them to a simpler format
            var rng = new Random();
            var selectedEvents = onThisDayResponse.Events.OrderBy(_ => rng.Next())
                .Take(numberOfEvents)
                .Select(e => new EventSummary { Year = e.Year, Description = e.Description })
                .ToList();

            return Ok(selectedEvents);
        }

        _logger.LogError("Failed to retrieve events. Status Code: {ResponseStatusCode}", response.StatusCode);
        return StatusCode((int)response.StatusCode);
    }
}