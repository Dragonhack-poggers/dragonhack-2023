using System.Text.Json.Serialization;

namespace DragonHack_2023.Models;

/// <summary>
/// Represents the response from the News API.
/// </summary>
public class NewsApiResponse
{
    /// <summary>
    /// Gets or sets the status of the response.
    /// </summary>
    [JsonPropertyName("status")]
    public string Status { get; set; }

    /// <summary>
    /// Gets or sets the total number of results.
    /// </summary>
    [JsonPropertyName("totalResults")]
    public int TotalResults { get; set; }

    /// <summary>
    /// Gets or sets the list of articles in the response.
    /// </summary>
    [JsonPropertyName("articles")]
    public List<Article> Articles { get; set; }
}

/// <summary>
/// Represents an article in the news API response.
/// </summary>
public class Article
{
    /// <summary>
    /// Gets or sets the source of the article.
    /// </summary>
    [JsonPropertyName("source")]
    public Source Source { get; set; }

    /// <summary>
    /// Gets or sets the author of the article.
    /// </summary>
    [JsonPropertyName("author")]
    public string Author { get; set; }

    /// <summary>
    /// Gets or sets the title of the article.
    /// </summary>
    [JsonPropertyName("title")]
    public string Title { get; set; }

    /// <summary>
    /// Gets or sets the description of the article.
    /// </summary>
    [JsonPropertyName("description")]
    public string Description { get; set; }

    /// <summary>
    /// Gets or sets the URL of the article.
    /// </summary>
    [JsonPropertyName("url")]
    public string Url { get; set; }

    /// <summary>
    /// Gets or sets the URL of the image related to the article.
    /// </summary>
    [JsonPropertyName("urlToImage")]
    public string UrlToImage { get; set; }

    /// <summary>
    /// Gets or sets the date and time the article was published.
    /// </summary>
    [JsonPropertyName("publishedAt")]
    public string PublishedAt { get; set; }

    /// <summary>
    /// Gets or sets the content of the article.
    /// </summary>
    [JsonPropertyName("content")]
    public string Content { get; set; }
}

/// <summary>
/// Represents the source of an article.
/// </summary>
public class Source
{
    /// <summary>
    /// Gets or sets the ID of the source.
    /// </summary>
    [JsonPropertyName("id")]
    public string Id { get; set; }

    /// <summary>
    /// Gets or sets the name of the source.
    /// </summary>
    [JsonPropertyName("name")]
    public string Name { get; set; }
}