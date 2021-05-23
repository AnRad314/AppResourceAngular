﻿using System;
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
			if(!_provider.Resources.Any())
			{
				Resource res = new Resource { Data = "Masha" };
				_provider.CreateResource(res);
			}
		}
		public IActionResult Index()
		{
			return View();
		}

		[HttpGet]
		public IEnumerable <Resource> Get ()	
		{
			return _provider.Resources.ToList();
		}

		[HttpGet("{id}")]
		public Resource Get(int id)
		{
			Resource res = _provider.Resources.FirstOrDefault(x => x.Id == id);
			return res;
		}

		[HttpPost]
		public IActionResult AddResource(string res)
		{
			if (ModelState.IsValid)
			{
				_provider.CreateResource(new Resource() { Data = res });
				return Ok(res);
			}
			return BadRequest(ModelState);
		}

		[HttpPut]
		public IActionResult Put(Resource res)
		{
			if (ModelState.IsValid)
			{
				if (res.isEdit == false)
				{
					_provider.BeginBlock(res);
					_provider.UpdateResource(res);
					_provider.EndBlock(res);
					return Ok(res);
				}	
			}
			return BadRequest(ModelState);
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id)
		{
			Resource res = _provider.Resources.FirstOrDefault(d => d.Id == id);
			if (res.isEdit == false)
			{
				_provider.BeginBlock(res);
				_provider.DeleteResource(id);
			}
			return Ok(res);
		}
		
	}
}
