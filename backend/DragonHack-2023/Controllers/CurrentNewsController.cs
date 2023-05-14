using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Collections.Generic;
using System.Net;
using DragonHack_2023.Models;
using System.Text.Json;

namespace DragonHack_2023.Controllers;

/// <summary>
/// Controller for handling requests related to current news.
/// </summary>
[ApiController]
[Route("[controller]")]
public class CurrentNewsController : ControllerBase
{
    private readonly ILogger<CurrentNewsController> _logger;
    private readonly IHttpClientFactory _clientFactory;
    /// <summary>
    /// The News API key used for making requests.
    /// </summary>
    private readonly string ApiKey = "pub_22119d587e629c06136a982baa0a008f645d7";
    
    /// <summary>
    /// Constructor for the CurrentNewsController.
    /// </summary>
    /// <param name="logger">An instance of ILogger used for logging.</param>
    /// <param name="clientFactory">An instance of IHttpClientFactory for creating HttpClient instances.</param>
    public CurrentNewsController(ILogger<CurrentNewsController> logger, IHttpClientFactory clientFactory)
    {
        _logger = logger;
        _clientFactory = clientFactory;
    }
    
    /// <summary>
    /// GET endpoint that returns latest news headlines.
    /// </summary>
    /// <param name="countryCode">The country code for which news are to be fetched.</param>
    /// <param name="numberOfHeadlines">The number of news headlines to return. Default is 3.</param>
    /// <param name="language">The language in which news are to be fetched. Default is 'si' (Slovenian).</param>
    /// <returns>A list of latest news headlines for the given country and language.</returns>
    [HttpGet]
    [Route("GetLatestHeadlines")]
    public async Task<IActionResult> GetLatestHeadlines(string countryCode, int numberOfHeadlines = 3, string language = "si")
    {
        var client = new HttpClient();
        var request = new HttpRequestMessage(HttpMethod.Get, "https://newsapi.org/v2/top-headlines?country=si&apiKey=718f0355420c490e9f9e273085a4472d");
        
        // Collection of parameters to be sent in the request.
        var collection = new List<KeyValuePair<string, string>>();
        collection.Add(new("country", "us"));
        collection.Add(new("apiKey", "718f0355420c490e9f9e273085a4472d"));
        var content = new FormUrlEncodedContent(collection);
        request.Content = content;
       
        // Send the request and get the response.
        var response = await client.SendAsync(request);
        response.EnsureSuccessStatusCode();
        
        // Read and deserialize the response content.
        var jsonResponse = await response.Content.ReadAsStringAsync();
        
        var newsApiResponse = JsonSerializer.Deserialize<NewsApiResponse>(jsonResponse);
        
        // If articles are found, return the titles of the first 'numberOfHeadlines' articles.
        if (newsApiResponse?.Articles != null)
        {
            var titles = newsApiResponse.Articles
                .Take(numberOfHeadlines)
                .Select(article => article.Title)
                .ToList();

            return Ok(titles);
        }
        
        // If no articles are found, return a NotFound result.
        return NotFound("No articles found.");
    }
    
}