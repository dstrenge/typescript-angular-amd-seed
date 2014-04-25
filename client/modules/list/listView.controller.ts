/// <amd-dependency path="angular" />

import listResourceImpl = require("./list.service");
import ConstantsLib = require("./_list.constants");

export interface IListViewControllerScope extends ng.IScope {
	currentUser: any;
	items: Array<listResourceImpl.IListItem>;
	controller: ListViewController;
	newItem: string;
}

export class ListViewController {
	public static $inject: string[] = ["$scope", ConstantsLib.Constants.ListServiceName, "$rootScope", "$routeParams"];
	constructor(
		private $scope: IListViewControllerScope,
		private ListItemService: listResourceImpl.IListItemResource,
		$rootScope: ng.IScope,
		$routeParams: Object) {

		$scope.controller = this;
		$scope.items = [];
		$scope.newItem = "";

		this.refresh();
	}

	refresh(): void {
		this.ListItemService.query((items: Array<listResourceImpl.IListItem>) => {
			items.forEach((item: listResourceImpl.IListItem) => {
				this.updateItem(item);
			});
		});
	}

	updateItem(item: listResourceImpl.IListItem) {
		var found: boolean = false;
		this.$scope.items.forEach((existingItem: listResourceImpl.IListItem) => {
			if (item.id === existingItem.id) {
				found = true;
			}
		});
		if (!found) {
			this.$scope.items.push(item);
		}
	}

	addItem(item: string) : void {
		if(item && item.length > 0)
		{
			var listItem: listResourceImpl.IListItem = new this.ListItemService({
					id: "id" + String(new Date().getTime()),
					text: item
				});

			listItem.$save().then((): void => {
				this.refresh();
			});

			this.$scope.newItem = "";
		}
	}
}


