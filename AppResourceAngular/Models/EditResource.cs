using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AppResourceAngular.Models
{
	public class EditResource
	{
		public Resource Data { get; set; }
		public bool AllowEdit { get; set; }
		public long StartTimeEdit { get; set; }
		public int MaxTimeEditSec { get; set; }
	}
}
