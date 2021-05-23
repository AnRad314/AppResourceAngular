using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AppResourceAngular.Models
{
	public class Resource	{
		public int Id { get; set; }
		[Required(ErrorMessage = "The Resource is required")]
		[StringLength(300, MinimumLength = 2, ErrorMessage = "String length must be between 2 and 300 characters")]
		public string Data { get; set; }
		public bool isEdit { get; set; } = false;
	}
}
