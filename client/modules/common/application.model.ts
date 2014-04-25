import WindowDimensions = require("./windowDimensions.model");

export interface IApplicationRootScope extends ng.IScope {
	dimensions: WindowDimensions;
	initialized: boolean;
	setLocation(location: string): void;
	setDimensions(dimensions: WindowDimensions): void;
}

