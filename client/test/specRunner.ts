/// <reference path="../Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../Scripts/typings/jasmine/jasmine.d.ts" />
/// <reference path="../Scripts/typings/requirejs/require.d.ts" />

(function () : void {
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


require(["jquery", "jasmine-html", "jasmine.async", "angular", "angular-resource", "angular-route", "angular-mocks", "app/app.module"], function ($, jasmine, jasmineasync, angular) : void {
	var jasmineEnv : any = jasmine.getEnv();
	jasmineEnv.updateInterval = 1000;

	var htmlReporter : any = new jasmine.HtmlReporter();

	jasmineEnv.addReporter(htmlReporter);

	jasmineEnv.specFilter = function (spec : any) : any {
		return htmlReporter.specFilter(spec);
	};

	var specs : any = [];

	specs.push("test/unit/modules/list/list.service.test.js");
	specs.push("test/unit/modules/list/listView.controller.test.js");
	specs.push("test/unit/modules/list/listItem.controller.test.js");

	$(function () : void {
		require(specs, function () : void {
			jasmineEnv.execute();
		});
	});
});
