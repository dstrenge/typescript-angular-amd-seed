import ListConstants = require("modules/list/_list.constants");
import ListModule = require("modules/list/_list.module");
import ListService = require("modules/list/list.service");

describe("List Service", function () : void {
	var myListService : ListService.IListItemResource;
	var async: asyncjasmine.IAsyncSpec = new AsyncSpec(this);

	async.beforeEach(function (done: any) : void {
		var myInjector : ng.auto.IInjectorService = angular.injector(["ngResource", ListModule.moduleName]);
		myInjector.invoke([ListConstants.ListServiceName, function (List: ListService.IListItemResource): void {
			myListService = List;
		}]);
		done();
	});

	async.afterEach(function (done: any) : void {
		done();
	});

	async.it("should retrieve all list items", function (done: any): void {
		var items: Array<ListService.IListItem> = myListService.query(
			function () : void {
				expect(items.length).toBe(0);
				done();
			},
			function () : void {
				expect(true).toBeFalsy();
				done();
			}
		);
	});

	async.it("should not be able to retrieve invalid case id (string)", function (done: any): void {
		myListService.get({ id: "hello" },
			function (): void {
				expect(true).toBe(false);
				done();
			},
			function (): void {
				expect(true).toBe(true);
				done();
			}
		);
	});

	async.it("should be able to add and delete items", function (done: any): void {
		var item: ListService.IListItem = new myListService({
			id: "hello",
			text: "hello"
		});

		item.$save(
			function (): void {
				expect(item.text).toBe('hello');
				expect(item.id).toBe('hello');

				item.$delete(
					function (): void {
						done();
					},
					function () {
						expect('item to be deleted').toBe(false);
					}
				);
				done();
			},
			function (): void {
				expect('item to be created').toBe(false);
				done();
			}
		);
	});
});
