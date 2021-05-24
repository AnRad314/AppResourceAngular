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
		private const int StopEditTimeSec = 300;

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
						if (item.IsEdit && (DateTime.UtcNow - item.StartTimeEdit).TotalSeconds < StopEditTimeSec)
						{
							return new EditResource()
							{
								Data = item.Resource,
								AllowEdit = false,
								StartTimeEdit = (long)item.StartTimeEdit.Subtract(new DateTime(1970, 1, 1)).TotalSeconds,
								MaxTimeEditSec = StopEditTimeSec
							};
						}

						item.IsEdit = true;
						item.StartTimeEdit = DateTime.Now;
						

						var t = new EditResource()
						{
							Data = item.Resource,
							AllowEdit = true,
							StartTimeEdit = (long)(DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1)).TotalSeconds),
							MaxTimeEditSec = StopEditTimeSec
						};
						return t;
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
