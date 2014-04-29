/// <amd-dependency path="angular" />

import listResourceImpl = require("./list.service");
import Constants = require("./_list.constants");

export interface IListViewControllerScope extends ng.IScope {
	currentUser: any;
	items: Array<listResourceImpl.IListItem>;
	controller: ListViewController;
	newItem: string;
}

export class ListViewController {
	public static $inject: string[] = ["$scope", Constants.ListServiceName, "$rootScope", "$routeParams"];
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
		this.ListItemService.query((items: Array<listResourceImpl.IListItem>): void => {
			this.$scope.items.splice(0, this.$scope.items.length);
			items.forEach((item: listResourceImpl.IListItem): void => {
				this.$scope.items.push(item);
			});
		});
	}

	addItem(item: string) : void {
		if (item && item.length > 0) {
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


