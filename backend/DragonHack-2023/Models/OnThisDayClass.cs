namespace DragonHack_2023.Models;

/// <summary>
/// Summary of an event.
/// </summary>
public class EventSummary
{
    /// <summary>
    /// Year of the event.
    /// </summary>
    /// <example>2023</example>
    public string? Year { get; set; }

    /// <summary>
    /// Description of the event.
    /// </summary>
    /// <example>A significant event occurred this year.</example>
    public string? Description { get; set; }
}

/// <summary>
/// Response from the "on this day" API.
/// </summary>
public class OnThisDayResponse
{
    /// <summary>
    /// Link to the Wikipedia page for this date.
    /// </summary>
    /// <example>https://wikipedia.org/wiki/May_13</example>
    public string? Wikipedia { get; set; }

    /// <summary>
    /// The date for which events are returned.
    /// </summary>
    /// <example>May 13</example>
    public string? Date { get; set; }

    /// <summary>
    /// List of events for this date.
    /// </summary>
    public List<Event>? Events { get; set; }
}

/// <summary>
/// Details of an event.
/// </summary>
public class Event
{
    /// <summary>
    /// Year of the event.
    /// </summary>
    /// <example>2023</example>
    public string? Year { get; set; }

    /// <summary>
    /// Description of the event.
    /// </summary>
    /// <example>A significant event occurred this year.</example>
    public string? Description { get; set; }

    /// <summary>
    /// List of relevant Wikipedia links for this event.
    /// </summary>
    public List<WikipediaLink>? Wikipedia { get; set; }
}

/// <summary>
/// Wikipedia link related to an event.
/// </summary>
public class WikipediaLink
{
    /// <summary>
    /// Title of the Wikipedia page.
    /// </summary>
    /// <example>Article Title</example>
    public string? Title { get; set; }

    /// <summary>
    /// Link to the Wikipedia page.
    /// </summary>
    /// <example>https://wikipedia.org/wiki/Article_Title</example>
    public string? Wikipedia { get; set; }
}
