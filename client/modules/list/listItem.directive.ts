/// <amd-dependency path="text!./listItem.partial.html!strip" />
import Constants = require("./_list.constants");
var listItemPartial: any = require("text!./listItem.partial.html!strip");

export class ListItemDirective implements ng.IDirective {
	public static $inject: string[] = ["$rootScope", "$compile"];
    constructor(private $scope: ng.IScope, private $compile: ng.ICompileService) {        
	}

	restrict: string = "E";
	scope: Object = {
		item: "=item"
    };
    template: string = listItemPartial;
    controller: string = Constants.ListItemControllerName;
}
