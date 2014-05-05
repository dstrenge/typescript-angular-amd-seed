/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Scripts/typings/jasmine/jasmine.d.ts" />
/// <reference path="../Scripts/typings/requirejs/require.d.ts" />
(function () {
    "use strict";
}());

require.config({
    paths: {
        app: "../app/",
        jquery: "../lib/jquery/jquery-1.7.1",
        angular: "../lib/angularjs/angular",
        modules: "../modules",
        text: "../lib/requirejs/text/text",
        "angular-animate": "../lib/angularjs/angular-animate",
        "angular-route": "../lib/angularjs/angular-route",
        "angular-resource": "../lib/angularjs/angular-resource",
        "angular-mocks": "../lib/angularjs/angular-mocks",
        "jasmine": "../lib/jasmine/jasmine",
        "jasmine-html": "../lib/jasmine/jasmine-html",
        "jasmine.async": "../lib/jasmine/jasmine.async",
        "kx.common": "../modules/common/_common.module",
        "kx.list": "../modules/list/_list.module",
        "test": "../test/"
    },
    shim: {
        jquery: {
            exports: "jquery"
        },
        angular: {
            exports: "angular"
        },
        "angular-animate": {
            deps: ["angular"],
            exports: "angular-animate"
        },
        "angular-route": {
            deps: ["angular"],
            exports: "angular-route"
        },
        "angular-resource": {
            deps: ["angular"],
            exports: "angular-resource"
        },
        "angular-mocks": {
            deps: ["angular"],
            exports: "angular-mocks"
        },
        "jasmine": {
            exports: "jasmine"
        },
        "jasmine-html": {
            deps: ["jasmine"],
            exports: "jasmine"
        },
        "jasmine.async": {
            deps: ["jasmine"],
            exports: "jasmine.async"
        }
    }
});

require(["jquery", "jasmine-html", "jasmine.async", "angular", "angular-resource", "angular-route", "angular-mocks", "app/app.module"], function ($, jasmine, jasmineasync, angular) {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var htmlReporter = new jasmine.HtmlReporter();

    jasmineEnv.addReporter(htmlReporter);

    jasmineEnv.specFilter = function (spec) {
        return htmlReporter.specFilter(spec);
    };

    var specs = [];

    specs.push("test/unit/modules/list/list.service.test.js");
    specs.push("test/unit/modules/list/listView.controller.test.js");
    specs.push("test/unit/modules/list/listItem.controller.test.js");

    $(function () {
        require(specs, function () {
            jasmineEnv.execute();
        });
    });
});
//# sourceMappingURL=specRunner.js.map
