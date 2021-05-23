using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppResourceAngular.Interface;
using AppResourceAngular.Models;
using Microsoft.AspNetCore.Mvc;

namespace AppResourceAngular.Controllers
{
	[ApiController]
	[Route("api/resources")]
	public class HomeController : Controller
	{
		private readonly IDataProvider _provider;
		public HomeController(IDataProvider provider)
		{			
			_provider = provider;			
		}		

		[HttpGet]
		public IEnumerable<Resource> Get()	
		{
			return _provider.Resources.Select(r => r.Resource).ToArray();
		}

		[HttpGet("{id}")]
		public Resource Get(int id)
		{
			Resource res = _provider.Resources.FirstOrDefault(x => x.Resource.Id == id)?.Resource;
			return res;
		}

		[HttpPost]		
		public IActionResult AddResource([FromBody] string res)
		{
			if (ModelState.IsValid)
			{
				_provider.CreateResource(res);
				return Ok(res);
			}
			return BadRequest(ModelState);
		}

		[HttpGet("edit/{id}")]
		public EditResource BeginEdit(int id)
		{
			return _provider.BeginEdit(id);			
		}

		[HttpPut]
		public IActionResult EndEdit(Resource res)
		{
			if (ModelState.IsValid)
			{
				if (_provider.EndEdit(res))
				{
					return Ok(res);
				}	
			}
			return BadRequest(ModelState);
		}

		[HttpDelete("{id}")]
		public IActionResult DeleteResource(int id)
		{
			_provider.DeleteResource(id);
			return Ok();
		}
		
	}
}
