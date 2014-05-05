define(["require", "exports", "modules/list/_list.constants", "modules/list/_list.module"], function(require, exports, ListConstants, ListModule) {
    describe("List Service", function () {
        var myListService;
        var async = new AsyncSpec(this);

        async.beforeEach(function (done) {
            var myInjector = angular.injector(["ngResource", ListModule.moduleName]);
            myInjector.invoke([
                ListConstants.ListServiceName, function (List) {
                    myListService = List;
                }]);
            done();
        });

        async.afterEach(function (done) {
            done();
        });

        async.it("should retrieve all list items", function (done) {
            var items = myListService.query(function () {
                expect(items.length).toBe(0);
                done();
            }, function () {
                expect(true).toBeFalsy();
                done();
            });
        });

        async.it("should not be able to retrieve invalid case id (string)", function (done) {
            myListService.get({ id: "hello" }, function () {
                expect(true).toBe(false);
                done();
            }, function () {
                expect(true).toBe(true);
                done();
            });
        });

        async.it("should be able to add and delete items", function (done) {
            var item = new myListService({
                id: "hello",
                text: "hello"
            });

            item.$save(function () {
                expect(item.text).toBe("hello");
                expect(item.id).toBe("hello");

                item.$delete(function () {
                    done();
                }, function () {
                    expect("item to be deleted").toBe(false);
                });
                done();
            }, function () {
                expect("item to be created").toBe(false);
                done();
            });
        });
    });
});
//# sourceMappingURL=list.service.test.js.map
