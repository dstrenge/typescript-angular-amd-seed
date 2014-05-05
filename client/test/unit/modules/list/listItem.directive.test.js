define(["require", "exports", "modules/list/_list.constants"], function(require, exports, ListConstants) {
    describe("List Item Directive", function () {
        var httpBackend;
        var scope;
        var compile;
        var element;
        var listService;

        beforeEach(function () {
            // load the modules we need for the test
            module("ngRoute");
            module("ngResource");
            module("kx.list");

            // inject controller, scope and our fake back end
            inject(function ($injector) {
                // stub out the back-end
                httpBackend = $injector.get("$httpBackend");

                // set up our scope
                scope = $injector.get("$rootScope").$new();

                // list service
                listService = $injector.get(ListConstants.ListServiceName);

                // compile our view
                compile = $injector.get("$compile");
            });

            // insert a fake item for now
            var item = new listService({
                id: "testID",
                text: "test"
            });
            scope.item = item;

            // create our directive
            element = angular.element("<kx-list-directive-list-item item='item'></kx-list-directive-list-item>");

            // compile the element with the scope and digest
            compile(element)(scope);
            scope.$digest();
        });

        afterEach(function () {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it("should show the name of the item", function () {
            // the directive should show a span that contains the name of the list item
            var nameSpan = element.find("span");
            expect(nameSpan).toBeDefined();
            expect(nameSpan[0].innerHTML).toBe("test");
        });

        it("should have a remove button", function () {
            // the directive should show a button that allows you to remove items
            var removeButton = element.find(".listItem-add-button");
            expect(removeButton).toBeDefined();
            expect(removeButton[0].innerHTML).toBe("X");
        });

        it("allows you to click on the remove button", function () {
            // the directive should show a button that allows you to remove items
            var removeButton = element.find(".listItem-add-button");
            expect(removeButton).toBeDefined();
            expect(removeButton[0].innerHTML).toBe("X");

            // clicking on it should invoke some back end stuff to be called so
            // let's make sure that's true
            httpBackend.expectDELETE("/SampleServer/api/list/testID").respond({ "id": "testID", "text": "test" });

            // now let's click on it
            removeButton[0].click();

            // flush the fake response (this will throw an error if delete wasn't called)
            httpBackend.flush();
        });
    });
});
//# sourceMappingURL=listItem.directive.test.js.map
