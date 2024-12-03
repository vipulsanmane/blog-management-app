using ApiTests.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.IO;

namespace BlogManagementApi.Controllers;

[ApiController]
[Route("[controller]")]
public class BlogController : ControllerBase
{
    private readonly ILogger<BlogController> _logger;

    public BlogController(ILogger<BlogController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    public ActionResult<List<Blog>> GetBlogs()
    {
        return JsonRepository.ReadFromJsonFile<Blog>();
    }

    [HttpGet("{id}")]
    public ActionResult<Blog> GetById(int id)
    {
        var blog = JsonRepository.ReadFromJsonFile<Blog>();
        var Blog = blog.FirstOrDefault(p => p.Id == id);
        if (Blog == null)
        {
            return NotFound();
        }
        return Blog;
    }

    [HttpPost]
    public ActionResult<Blog> CreateBlog([FromBody] Blog newBlog)
    {
        var blogs = JsonRepository.ReadFromJsonFile<Blog>();
        newBlog.Id = blogs.Count == 0 ? 1 : blogs.Max(x => x.Id) + 1;
        newBlog.CreatedDate = DateTime.Now;
        blogs.Add(newBlog);
        JsonRepository.WriteToJsonFile(blogs);
        return CreatedAtAction(nameof(GetBlogs), new { id = newBlog.Id }, newBlog);
    }

    [HttpPut("{id}")]
    public ActionResult UpdateBlog(int id, [FromBody] Blog updatedBlog)
    {
        var blog = JsonRepository.ReadFromJsonFile<Blog>();
        var Blog = blog.FirstOrDefault(p => p.Id == id);

        if (Blog == null)
        {
            return NotFound();
        }

        Blog.Username = updatedBlog.Username;
        Blog.Text = updatedBlog.Text;
        Blog.CreatedDate = DateTime.Now;
        JsonRepository.WriteToJsonFile(blog);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteBlog(int id)
    {
        var blog = JsonRepository.ReadFromJsonFile<Blog>();
        var Blog = blog.FirstOrDefault(p => p.Id == id);

        if (Blog == null)
        {
            return NotFound();
        }

        blog.Remove(Blog);
        JsonRepository.WriteToJsonFile(blog);

        return NoContent();
    }
}

