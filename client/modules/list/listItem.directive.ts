
/// <amd-dependency path="text!./listItem.partial.html!strip" />
var listViewPartial: any = require("text!./listItem.partial.html!strip");

export class ListItemDirective implements ng.IDirective {
	public static $inject: string[] = ["$rootScope", "$compile"];
	constructor(private $scope: ng.IScope, private $compile: ng.ICompileService) {
	}

	restrict: string = "E";
	scope: Object = {
		item: "=item"
	};
	template: string = listViewPartial;

	link: any = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes): void => {

	};
}
