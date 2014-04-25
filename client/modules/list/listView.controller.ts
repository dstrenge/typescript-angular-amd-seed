/// <amd-dependency path="angular" />

import listResourceImpl = require("./list.service");
import ConstantsLib = require("./_list.constants");

export interface IListViewControllerScope extends ng.IScope {
	currentUser: any;
	items: Array<listResourceImpl.IListItem>;
	controller: ListViewController;
}

export class ListViewController {
	public static $inject: string[] = ["$scope", ConstantsLib.Constants.ListServiceName, "$rootScope", "$routeParams"];
	constructor(
		private $scope: IListViewControllerScope,
		private ListItemService: listResourceImpl.IListItemResource,
		$rootScope: ng.IScope,
		$routeParams: Object) {

		$scope.controller = this;

		this.refresh();
	}

	refresh(): void {
		this.$scope.items = this.ListItemService.query();
	}

	addItem(item: string) : void {
		var listItem: listResourceImpl.IListItem = new this.ListItemService({
				id: "id" + String(new Date().getTime()),
				text: item
			});

		listItem.$save().then((): void => {
			this.refresh();
		});

		this.refresh();
	}
}


