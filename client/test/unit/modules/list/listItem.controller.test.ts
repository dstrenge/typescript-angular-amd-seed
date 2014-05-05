import ListConstants = require("modules/list/_list.constants");
import ListService = require("modules/list/list.service");
import ListItemController = require("modules/list/listItem.controller");

describe("List Item Controller", function (): void {
	var scope: ListItemController.IListItemControllerScope;
	var controllerService: ng.IControllerService;
	var controller: ListItemController.ListItemController;
	var httpBackend: ng.IHttpBackendService;
	var listService: ListService.IListItemResource;

	beforeEach(function (): void {
		// load the modules we need for the test
		module("ngRoute");
		module("ngResource");
		module("kx.list");

		// inject controller, scope and our fake back end
		inject(function ($injector: ng.auto.IInjectorService): void {
			// stub out the back-end
			httpBackend = $injector.get("$httpBackend");

			// set up our scope
			scope = $injector.get("$rootScope").$new();

			// list service
			listService = $injector.get(ListConstants.ListServiceName);

			// set up controller service
			controllerService = $injector.get("$controller");
		});

		// create our controller which will query the 
		controller = controllerService(ListConstants.ListItemControllerName, {
			$scope: scope,
			ListItemService: listService
		});
	});

	afterEach(function (): void {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	it("should be empty to start", function (): void {
		// check our scope
		expect(scope.items.length).toBe(0);
		expect(scope.controller).toBe(controller);
	});

	it("should be able to delete items", function (): void {
		// set up a default response from our fake server when we query
		httpBackend.whenGET("/SampleServer/api/list").respond([
			{ "id": "item1", "text": "item1" },
			{ "id": "item2", "text": "item2" },
			{ "id": "item3", "text": "item3" },
			{ "id": "item4", "text": "item4" },
			{ "id": "item5", "text": "item5" },
		]);

		// first lets populate with some fake items
		listService.query((items: Array<ListService.IListItem>): void => {
			scope.items.splice(0, scope.items.length);
			items.forEach((item: ListService.IListItem): void => {
				scope.items.push(item);
			});
		});

		// flush the mock data (so the query returns our starting items)
		httpBackend.flush();

		// check our scope
		expect(scope.items.length).toBe(5);
		expect(scope.controller).toBe(controller);

		// set up the back end and delete a few items
		httpBackend.whenDELETE(/\/SampleServer\/api\/list\/item[0-9]*/).respond({ "success": "true" });
		httpBackend.whenGET("/SampleServer/api/list").respond([
			{ "id": "item1", "text": "item1" },
			{ "id": "item3", "text": "item3" },
			{ "id": "item5", "text": "item5" },
		]);

		// now actually delete some items
		controller.removeItem(scope.items[1]);
		controller.removeItem(scope.items[3]);

		// flush backend
		httpBackend.flush();

		// first lets get the updated list of items
		listService.query((items: Array<ListService.IListItem>): void => {
			scope.items.splice(0, scope.items.length);
			items.forEach((item: ListService.IListItem): void => {
				scope.items.push(item);
			});
		});

		// flush backend
		httpBackend.flush();

		// check our scope, should be at 3 items now.
		expect(scope.items.length).toBe(3);
		expect(scope.controller).toBe(controller);
	});
});
