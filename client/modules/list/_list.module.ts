/// <amd-dependency path="text!./listView.partial.html!strip" />
import Common = require("../common/_common.module");
import ConstantsLib = require("./_list.constants");
import listViewImpl = require("./listView.controller");
import listServiceImpl = require("./list.service");
import listItemImpl = require("./listItem.directive");
var listViewPartial: any = require("text!./listView.partial.html!strip");

module List {
	export var moduleName: string = "kx.list";

	export interface IListPartials {
		ListView: string;
	}

	export var Partials: IListPartials = {
		ListView: listViewPartial
	};

	export var listModule: ng.IModule = angular.module(moduleName, ["ngAnimate"])
		.factory(ConstantsLib.Constants.ListServiceName, listServiceImpl.ListService);

	Common.addController(listModule, ConstantsLib.Constants.ListViewName, listViewImpl.ListViewController);
	Common.addDirective(listModule, ConstantsLib.Constants.ListItemName, listItemImpl.ListItemDirective);
}

export = List;
