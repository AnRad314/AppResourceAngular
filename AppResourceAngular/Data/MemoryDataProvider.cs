using AppResourceAngular.Interface;
using AppResourceAngular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppResourceAngular.Data
{
	public class MemoryDataProvider: IDataProvider
	{
		private int _lastId = 1;
		private List<Resource> _resources = new List<Resource>();
		public IEnumerable<Resource> Resources => _resources;

		public void BeginBlock(Resource res)
		{
			foreach (var item in _resources)
			{
				if (item.Id == res.Id)
				{
					item.isEdit = true;
				}
			}
		}

		public void CreateResource(Resource res)
		{
			res.Id = _lastId;
			_lastId++;
			_resources.Add(res);
		}

		public void DeleteResource(int id)
		{
			_resources.Remove(_resources.FirstOrDefault(d => d.Id == id));
		}

		public void EndBlock(Resource res)
		{
			foreach (var item in _resources)
			{
				if (item.Id == res.Id)
				{
					item.isEdit = false;
				}
			}
		}
		public void UpdateResource(Resource res)
		{

			foreach (var item in _resources)
			{
				if (item.Id == res.Id)
				{

					item.Data = res.Data;
				}
			}
		}
	}
}
