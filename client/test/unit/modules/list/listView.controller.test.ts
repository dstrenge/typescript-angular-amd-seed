import ListConstants = require("modules/list/_list.constants");
import ListService = require("modules/list/list.service");
import ListViewController = require("modules/list/listView.controller");

describe("List View Controller", function () : void {
	var scope: ListViewController.IListViewControllerScope;
	var controllerService: ng.IControllerService;
	var controller: ListViewController.ListViewController;
	var httpBackend: ng.IHttpBackendService;
	var listService: ListService.IListItemResource;

	beforeEach(function (): void {
		// load the modules we need for the test
		module("ngRoute");
		module("ngResource");
		module("kx.list");

		// inject controller, scope and our fake back end
		inject(function ($injector : ng.auto.IInjectorService) : void {
			// stub out the back-end
			httpBackend = $injector.get("$httpBackend");

			// set up our scope
			scope = $injector.get("$rootScope").$new();

			// list service
			listService = $injector.get(ListConstants.ListServiceName);

			// set up controller service
			controllerService = $injector.get("$controller");
		});

		// set up a default response from our fake server when we query
		httpBackend.expectGET("/SampleServer/api/list").respond([
			{ "id": "item1", "text": "item1" },
			{ "id": "item2", "text": "item2" },
			{ "id": "item3", "text": "item3" },
			{ "id": "item4", "text": "item4" },
			{ "id": "item5", "text": "item5" },
		]);

		// create our controller which will query the 
		controller = controllerService(ListConstants.ListViewName, {
			$scope: scope,
			ListItemService: listService
		});
	});

	afterEach(function (): void {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	it("queries the list service on creation", function() : void {
		// flush the mock data (so the query returns our starting items)
		httpBackend.flush();

		// check our scope
		expect(scope.items.length).toBe(5);
		expect(scope.controller).toBe(controller);
		expect(scope.newItem).toBe("");
	});

	it("can refresh itself to retrieve the updated list of items", function (): void {
		// flush the mock data (so the query returns our starting items)
		httpBackend.flush();

		// check our scope
		expect(scope.items.length).toBe(5);
		expect(scope.controller).toBe(controller);
		expect(scope.newItem).toBe("");

		// now let's do it again with a different result this time and we'll call refresh
		// set up a default response from our fake server when we query
		httpBackend.expectGET("/SampleServer/api/list").respond([
			{ "id": "item1", "text": "item1" },
			{ "id": "item2", "text": "item2" },
			{ "id": "item3", "text": "item3" },
			{ "id": "item4", "text": "item4" },
		]);
		controller.refresh();
		httpBackend.flush();

		// check our scope, should be 4 items this time
		expect(scope.items.length).toBe(4);
		expect(scope.controller).toBe(controller);
		expect(scope.newItem).toBe("");
	});

	it("should be able to add items", function (): void {
		// flush the mock data (so the query returns our starting items)
		httpBackend.flush();

		// check our scope
		expect(scope.items.length).toBe(5);
		expect(scope.controller).toBe(controller);
		expect(scope.newItem).toBe("");

		// set up the back end and add a new item
		httpBackend.expectPOST(/\/SampleServer\/api\/list\/id[0-9]*/).respond({ "id": "item6", "text": "item6" });
		httpBackend.expectGET("/SampleServer/api/list").respond([
			{ "id": "item1", "text": "item1" },
			{ "id": "item2", "text": "item2" },
			{ "id": "item3", "text": "item3" },
			{ "id": "item4", "text": "item4" },
			{ "id": "item5", "text": "item5" },
			{ "id": "item6", "text": "item6" }
		]);
		controller.addItem("item6");

		httpBackend.flush();

		// check our scope, should be at 6 items now.
		expect(scope.items.length).toBe(6);
		expect(scope.controller).toBe(controller);
		expect(scope.newItem).toBe("");
	});
});
