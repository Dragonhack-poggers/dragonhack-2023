using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using DragonHack_2023.Models;

namespace DragonHack_2023.Controllers;

[Route("api/[controller]")]
    [ApiController]
    public class OpenAiChatController : ControllerBase
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly ILogger<OpenAiChatController> _logger;

        private readonly string OpenAiToken = "YpPZjNhlC258MzkDTmWol6ZuqWTDgi";
        private readonly string OpenAiModel = "gpt-4"; // Or your model of choice

        public OpenAiChatController(IHttpClientFactory clientFactory, ILogger<OpenAiChatController> logger)
        {
            _clientFactory = clientFactory;
            _logger = logger;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserMessage message)
        {
            var client = _clientFactory.CreateClient();

            var request = new HttpRequestMessage(HttpMethod.Post, "https://openai-api.meetings.bio/api/openai/chat/completions");

            request.Headers.Add("Authorization", $"Bearer {OpenAiToken}");

            var requestBody = new
            {
                model = OpenAiModel,
                messages = new[] { new { role = "user", content = message.Content } }
            };
            
            if (message == null || message.Content == null)
            {
                _logger.LogError("Invalid message content");
                return BadRequest("Invalid message content");
            }
            
            request.Content = new StringContent(JsonSerializer.Serialize(requestBody), System.Text.Encoding.UTF8, "application/json");

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                var openAiResponse = JsonSerializer.Deserialize<OpenAiChatResponse>(responseContent);
                if (openAiResponse.Choices != null && openAiResponse.Choices.Length > 0)
                {
                    return Ok(openAiResponse.Choices[0].Content);
                }
                else
                {
                    _logger.LogError("No choices returned from OpenAI.");
                    return NotFound("No choices returned from OpenAI.");
                }
            }
            else
            {
                _logger.LogError("Failed to send message to OpenAI. Status Code: {ResponseStatusCode}", response.StatusCode);
                return StatusCode((int)response.StatusCode);
            }
        }
    }

public class UserMessage
{
    public string Content { get; set; }
}

public class OpenAiChatResponse
{
    public Choice[] Choices { get; set; }

    public class Choice
    {
        public string Content { get; set; }
    }
}