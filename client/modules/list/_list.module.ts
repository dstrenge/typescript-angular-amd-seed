/// <amd-dependency path="text!./listView.partial.html!strip" />
import Common = require("../common/_common.module");
import Constants = require("./_list.constants");
import listViewImpl = require("./listView.controller");
import listServiceImpl = require("./list.service");
import listItemImpl = require("./listItem.directive");
var listViewPartial: any = require("text!./listView.partial.html!strip");

export var moduleName: string = "kx.list";

export interface IListPartials {
	ListView: string;
}

export var Partials: IListPartials = {
	ListView: listViewPartial
};

var listModule: ng.IModule = angular.module(moduleName, ["ngAnimate"])
	.factory(Constants.ListServiceName, listServiceImpl.ListService)
	.controller(Constants.ListViewName, listViewImpl.ListViewController);

Common.addDirective(listModule, Constants.ListItemName, listItemImpl.ListItemDirective);

