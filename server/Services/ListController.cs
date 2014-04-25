using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using server.Models;

namespace server {
	public class ListController : ApiController {
		private static Dictionary<string, ListItem> items = new Dictionary<string, ListItem>();

		// GET api/<controller>
		public IEnumerable<ListItem> Get() {
			return items.Values;
		}

		// GET api/<controller>/5
		public ListItem Get(string id) {
			return items[id];
		}

		// POST api/<controller>/id
		public void Post(string id, [FromBody]ListItem value) {
			items.Add(id, value);
		}

		// DELETE api/<controller>/5
		public void Delete(string id) {
			items.Remove(id);
		}
	}
}