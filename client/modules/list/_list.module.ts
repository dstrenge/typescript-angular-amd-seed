/// <amd-dependency path="text!./listView.partial.html!strip" />
import Common = require("../common/_common.module");
import Constants = require("./_list.constants");
import listViewImpl = require("./listView.controller");
import listServiceImpl = require("./list.service");
import listItemDirective = require("./listItem.directive");
import listItemImpl = require("./listItem.controller");
import EnterBindDirective = require("../common/enterBind.directive");
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
    .controller(Constants.ListViewName, listViewImpl.ListViewController)
    .controller(Constants.ListItemControllerName, listItemImpl.ListItemController);

Common.addDirective(listModule, Constants.ListItemDirectiveName, listItemDirective.ListItemDirective);
Common.addDirective(listModule, Constants.EnterBindDirectiveName, EnterBindDirective.EnterBindDirective);

