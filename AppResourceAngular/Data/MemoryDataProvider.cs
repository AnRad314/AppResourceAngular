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
		private List<InternalResource> _resources = new List<InternalResource>();
		public IEnumerable<InternalResource> Resources => _resources;

		public EditResource BeginEdit(int id)
		{
			foreach (var item in _resources)
			{
				if (item.Resource.Id == id)
				{
					if(item.IsEdit)
					{
						return new EditResource()
						{
							Data = item.Resource,
							AllowEdit = false							
						};
					}

					item.IsEdit = true;
					return new EditResource()
					{
						Data = item.Resource,
						AllowEdit = true
					};
				}
			}
			return null;
		}

		public bool EndEdit(Resource res)
		{
			foreach (var item in _resources)
			{
				if (item.Resource.Id == res.Id)
				{
					if (item.IsEdit)
					{
						item.IsEdit = false;
						item.Resource = res;
						return true;
					}
				}
			}
			return false;
		}

		public void CreateResource(string data)
		{
			var newRes = new InternalResource 
			{ 
				Resource = new Resource { Id = _lastId, Data = data }
			};
			_lastId++;
			_resources.Add(newRes);
		}

		public void DeleteResource(int id)
		{
			foreach(var res in _resources)
			{
				if(res.Resource.Id == id)
				{
					_resources.Remove(res);
					break;
				}
			}
			
		}
	}
}
