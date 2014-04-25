using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace server.Models {
	public class ListItem {
		public string id { get; set; }
		public string text { get; set; }

		public ListItem() {
			id = string.Empty;
			text = string.Empty;
		}

		public ListItem(string id, string text) {
			this.id = id;
			this.text = text;
		}
	}
}