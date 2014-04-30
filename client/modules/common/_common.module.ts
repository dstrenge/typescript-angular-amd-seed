/// <amd-dependency path="angular" />

import Application = require("./application.model");
import WindowDimensionsImpl = require("./windowDimensions.model");
import Constants = require("./_common.constants");
import EnterKeypressDirective = require("./enterKeypress.directive");

export var moduleName: string = "kx.common";

export interface IApplicationRootScope extends Application.IApplicationRootScope {
};

export class WindowDimensions extends WindowDimensionsImpl {
};

export function addDirective(ngModule: ng.IModule, name: string, directive: any): ng.IModule {
	return ngModule.directive(name, [].concat(directive.$inject, function (): Function {
		var args: Array<any> = Array.prototype.slice.call(arguments, 0);
		args.unshift(null);
		return new (Function.prototype.bind.apply(directive, args));
	}));
}

var commonModule: ng.IModule =angular.module(moduleName, []);

addDirective(commonModule, Constants.EnterKeypressDirectiveName, EnterKeypressDirective.EnterKeypressDirective);
