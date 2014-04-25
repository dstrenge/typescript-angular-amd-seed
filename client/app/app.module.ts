/// <amd-dependency path="angular" />
/// <amd-dependency path="angular-animate" />
/// <amd-dependency path="angular-route" />

import Common = require("../modules/common/_common.module");
import List = require("../modules/list/_list.module");

var Application: ng.IModule = angular.module("kx.application", [
	"ngAnimate",
	"ngRoute",
	"ngResource",
	Common.moduleName,
	List.moduleName
]).run(function ($rootScope: Common.IApplicationRootScope, $window: ng.IWindowService, $location: ng.ILocationService): void {
		$rootScope.dimensions = {

			height: $window.innerHeight,
			width: $window.innerWidth,
			rotation: false
		};

		$rootScope.setLocation = function (url: string): void {
			$rootScope.$apply(function (): void {
				$location.path(url);
			});
		};

		$rootScope.setDimensions = function (dimensions: Common.WindowDimensions): void {
			$rootScope.$apply(function (): void {
				$rootScope.dimensions = dimensions;
			});
		};


		$rootScope.initialized = true;
	}).config(function (
		$routeProvider: ng.route.IRouteProvider,
		$httpProvider: ng.IHttpProvider,
		$locationProvider: ng.ILocationProvider): void {

		$routeProvider.when("/", {
			template: List.Partials.ListView
		});
		$routeProvider.otherwise({ redirectTo: "/" });
	});

export = Application;
