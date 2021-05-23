using AppResourceAngular.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AppResourceAngular.Interface
{
	public interface IDataProvider
	{
		IEnumerable<Resource> Resources { get; }
		void CreateResource(Resource res);
		void DeleteResource(int id);
		void UpdateResource(Resource res);
		void BeginBlock(Resource res);
		void EndBlock(Resource res);
	}
}
