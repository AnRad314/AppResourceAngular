using AppResourceAngular.Interface;
using AppResourceAngular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AppResourceAngular.Data
{
	public class MemoryDataProvider: IDataProvider
	{
		private int _lastId = 1;
		private readonly List<InternalResource> _resources = new List<InternalResource>();
		private readonly ReaderWriterLock _rwl = new ReaderWriterLock();
		
		public IEnumerable<InternalResource> Resources
		{
			get
			{
				_rwl.AcquireReaderLock(Timeout.Infinite);
				try
				{
					return _resources.ToArray();
				}
				finally
				{
					_rwl.ReleaseReaderLock();
				}
			}
		} 

		public EditResource BeginEdit(int id)
		{
			_rwl.AcquireReaderLock(Timeout.Infinite);
			try 
			{
				foreach (var item in _resources)
				{
					if (item.Resource.Id == id)
					{
						if (item.IsEdit)
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
			finally
			{
				_rwl.ReleaseReaderLock();
			}			
		}

		public bool EndEdit(Resource res)
		{
			_rwl.AcquireReaderLock(Timeout.Infinite);
			try 
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
			finally
			{
				_rwl.ReleaseReaderLock();
			}
		}

		public void CancelEdit(int id)
		{
			_rwl.AcquireReaderLock(Timeout.Infinite);
			try 
			{
				foreach (var item in _resources)
				{
					if (item.Resource.Id == id)
					{
						item.IsEdit = false;						
						break;
					}
				}
			}
			finally
			{
				_rwl.ReleaseReaderLock();
			}					
		}

		public void CreateResource(string data)
		{
			_rwl.AcquireWriterLock(Timeout.Infinite);
			try 
			{
				var newRes = new InternalResource
				{
					Resource = new Resource { Id = _lastId, Data = data }
				};
				_lastId++;
				_resources.Add(newRes);
			}
			finally
			{
				_rwl.ReleaseWriterLock();
			}
		}

		public void DeleteResource(int id)
		{
			_rwl.AcquireWriterLock(Timeout.Infinite);
			try 
			{
				foreach (var res in _resources)
				{
					if (res.Resource.Id == id)
					{
						_resources.Remove(res);
						break;
					}
				}
			}
			finally 
			{ 
				_rwl.ReleaseWriterLock();
			}							
		}
	}
}
