import ListConstants = require("modules/list/_list.constants");
import ListItemController = require("modules/list/listItem.controller");
import ListService = require("modules/list/list.service");

describe("List Item Directive", function (): void {
	var httpBackend: ng.IHttpBackendService;
	var scope : any;
	var compile : ng.ICompileService;
	var element : any;
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

			// compile our view
			compile = $injector.get("$compile");
		});

		// Insert a fake item for now
		var item : ListService.IListItem = new listService({
			id: "testID",
			text: "test"
		});
		scope.item = item;

		// create our directive
		element = angular.element('<kx-list-directive-list-item item="item"></kx-list-directive-list-item>');

		// compile the element with the scope and digest
		compile(element)(scope);
		scope.$digest();
	});

	afterEach(function (): void {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});

	it("should show the name of the item", function() : void {
		// The directive should show a span that contains the name of the list item
		var nameSpan = element.find('span');
		expect(nameSpan).toBeDefined();
		expect(nameSpan[0].innerHTML).toBe("test");
	});

	it("should have a remove button", function (): void {
		// The directive should show a button that allows you to remove items
		var removeButton = element.find('.listItem-add-button');
		expect(removeButton).toBeDefined();
		expect(removeButton[0].innerHTML).toBe("X");
	});

	it ("allows you to click on the remove button", function() : void {	
		// The directive should show a button that allows you to remove items
		var removeButton = element.find('.listItem-add-button');
		expect(removeButton).toBeDefined();
		expect(removeButton[0].innerHTML).toBe("X");

		// clicking on it should invoke some back end stuff to be called so 
		// let's make sure that's true
		httpBackend.expectDELETE("/SampleServer/api/list/testID").respond(
			{ "id": "testID", "text": "test" }
		);

		// now let's click on it
		removeButton[0].click();

		// flush the fake response (this will throw an error if delete wasn't called)
		httpBackend.flush();
	});
});
 