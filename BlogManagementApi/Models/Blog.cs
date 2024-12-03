using System;
using System.ComponentModel.DataAnnotations;

namespace ApiTests.Models
{
	public class Blog
	{
        public int Id { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Text { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.Now;
    }
}

