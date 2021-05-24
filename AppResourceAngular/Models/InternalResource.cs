using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppResourceAngular.Models
{
	public class InternalResource
	{
		public Resource Resource { get; set; }
		public bool IsEdit { get; set; }
		public DateTime StartTimeEdit { get; set; }		
	}
}
