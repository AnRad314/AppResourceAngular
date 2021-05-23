using AppResourceAngular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppResourceAngular.Interface
{
	public interface IDataProvider
	{
		IEnumerable<InternalResource> Resources { get; }
		void CreateResource(string data);
		void DeleteResource(int id);
		EditResource BeginEdit(int id);
		bool EndEdit(Resource res);
		void CancelEdit(int id);
	}
}
