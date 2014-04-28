# Typescript/AngularJS/AMD Seed Application
===========================

This project is an attempt to standardize the [Kinaxis](http://www.kinaxis.com) web application framework.  Feel free to use this as an example for your own projects and/or provide feedback.  We'd love to hear from you.

The seed contains a small Visual Studio 2013 [AngularJS](http://www.angularjs.org) application and [WebAPI](http://www.asp.net/web-api) back-end.  The application can add items to a list on the server.  The back-end is not meant to be anything more than a shell.

## Getting Started

Clone the repository using:

```
git clone git://github.com/dstrenge/typescript-angular-amd-seed
cd typescript-angular-amd-seed
```

### Dependencies

* Visual Studio 2013 Update 2
* IIS 7+
* ASP.Net 4.5.1
* (_recommended_) Chrome 
* (_recommended_) Web Essentials 2013

### Build

* Open typescript-angular-amd.sln in Visual Studio 2013
* Build / Rebuild solution

### Run

* Browse to http://localhost/SampleClient/

## File Naming Conventions

### Module (_*.module.ts)

These files define what is exported by a given module.  When another module is re-using code from a particular module, this is the only file that should be imported.  All other files should be considered 'private' and not externally visible.  Within these files, the AngularJS module is defined and constructed using controllers/directives/services defined elsewhere.

### Controllers (*.controller.ts)

These represent the controller definitions for the module.  Each exports a class and an interface for the scope that it will define.

### Directives (*.directive.ts)

These file represent directives defined in the module.  They may or may not have an associated partial.

### Services (*.service.ts)

These files define services for the module.

### Model (*.model.ts)

These are model definitions for classes in the module.  They are exposed in the module definition.

### Constants (*.constants.ts)

These are the constants re-used across the module.

### Partials (*.partial.html)

These represent the partials used by controllers/directives.  They share the same name as their associated controller/directive for easy access in the IDE/file system.

### SASS (_*.styles.scss)

The underscore prefix for SASS files indicates a partial SCSS file.  These are not transformed into CSS. This is desirable for the module SASS files because they should only be imported by an application module.


## Module Structure

A typical 'module' will contain a module definition file (_<module_name>.module.ts) that will export any number of interfaces, classes, functions, constants.  In the case of an angular module, the module file is responsible for creating the AngularJS module (using angular.module) and inserting any controllers, directives, services, factories into that module.  

```
var listModule: ng.IModule = angular.module(moduleName, ["ngAnimate"])
	.factory(Constants.ListServiceName, listServiceImpl.ListService)
	.controller(Constants.ListViewName, listViewImpl.ListViewController);
```

Therefore, an external user of the module will only need to import the module (using require) to make use of its items or AngularJS module.

```
import Common = require("../common/_common.module");

var app = angular.module(moduleName, [Common.moduleName]);
```

The controller files define the AngularJS controllers that will be used in partials, html, etc.  It is our standard to reference the controller in the scope so that its functions are called in context.  The scope is defined using an interface that extends ng.IScope.

```
export class ListViewController {
	public static $inject: string[] = ["$scope", Constants.ListServiceName, "$rootScope", "$routeParams"];
	constructor(
		private $scope: IListViewControllerScope,
		private ListItemService: listResourceImpl.IListItemResource,
		$rootScope: ng.IScope,
		$routeParams: Object) {

		$scope.controller = this;
		$scope.items = [];
		$scope.newItem = "";

		this.refresh();
	}
	
	...
	
	refresh(): void {
		// implementation
	}
```

Services and directives are exported in a similar fashion.  Partials are also exported in the module definition file so that they can be used in IRouteProvider.

We have chosen not to define typescript modules in the module file since the code generated is functionally equivalent when imported by require (and we save at least one function call).

## Coding Conventions

The following represents an explicit list of coding conventions in our application:

### AngularJS namespace

Our AngularJS modules are all prefixed using the following format:

Controller/Services:  kx.<module name>.<type>.<name>
Directives:  kx<module><type><name>

where the type is one of controller/directive/service and name is the actual name of the class.

### Partials

We prefer to define all the HTML in partials to keep it separated from the code.  In the partials, it is acceptable to reference the controller within the module (or an external controller from an imported module).  Bad references are not caught at compile time, so should be handle with care.

### SASS

We prefix all module SASS with underscore.  This has the effect of not compiling the SCSS file into CSS.  The file has to be imported into another SCSS file to be used.  There are drawbacks to this, as when changes are made in a module SCSS, the main SCSS file needs to be touched and recompiled.

### Constants

Constants are exported as individual variables.  This eliminates the need for a separate interface definition for each constants file.


## Directory Structure

	client/
	  app/					--> main application module
	    app.module.ts		--> angular module definition for application
		app.styles.scss		--> SASS styles for application
		main.js				--> requirejs config/main
	  modules/				--> location for modules that can be shared
	    common/							--> directory for the common module
		  _common.module.ts				--> module definition for the common module
		  _application.model.ts			--> model that defines the application root scope
		  _windowDimensions.model.ts	--> model that defines the window dimensions of the browser
		list/						--> directory for the list module
		  _list.constants.ts		--> constants used in the list module
		  _list.module.ts			--> module definition for the list module
		  _list.styles.scss			--> SASS for list module
		  list.service.ts			--> resource service for retrieving list items from server
		  listItem.directive.ts		--> directive for an item in the list
		  listItem.partial.html		--> html for the list item
		  listView.controller.ts	--> controller for the list view
		  listView.partial.html		--> html for the list view
	  Scripts/				--> default location for NuGet script packages
	    typings/			--> definitely typed definitions for 3rd party libraries
		  angularjs/		--> definition files for angularjs
		  jquery/			--> definition files for jquery
		  requirejs/		--> definition files for requirejs
		_references.js		--> references for VS2013
	  lib/					--> libraries used by the application
	    angularjs/			--> AngularJS library
		requirejs/			--> RequireJS library
	server/
	  App_Start				--> WebAPI configuration/Filter configuration
	  Models				--> ListItem model
	  Services				--> List WebAPI controller



## Testing

Future