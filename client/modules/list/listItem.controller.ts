/// <amd-dependency path="angular" />

import listResourceImpl = require("./list.service");
import Constants = require("./_list.constants");

export interface IListItemControllerScope extends ng.IScope {
	currentUser: any;
	items: Array<listResourceImpl.IListItem>;
	controller: ListItemController;
}

export class ListItemController {
	public static $inject: string[] = ["$scope", Constants.ListServiceName, "$rootScope", "$routeParams"];
	constructor(
		private $scope: IListItemControllerScope,
		private ListItemService: listResourceImpl.IListItemResource,
		$rootScope: ng.IScope,
		$routeParams: Object) {

        $scope.controller = this;
        $scope.items = [];
	}	

    removeItem(listItem: listResourceImpl.IListItem): void {
        listItem.$remove().then((): void => {
            this.$scope.$emit('refresh');
        });
    }
}


