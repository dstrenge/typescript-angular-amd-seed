'use strict';

require.config({
	paths: {
		app: '.',
		modules: '../modules',
		text: '../lib/requirejs/text/text',
		angular: '../lib/angularjs/angular',
		'angular-animate': '../lib/angularjs/angular-animate',
		'angular-route': '../lib/angularjs/angular-route',
		'angular-resource': '../lib/angularjs/angular-resource',
		'kx.common': '../modules/common/_common.module'
	},

	shim: {
		angular: {
			exports: 'angular'
		},
		'angular-animate': {
			deps: ['angular'],
			exports: 'angular-animate'
		},
		'angular-route': {
			deps: ['angular'],
			exports: 'angular-route'
		},
		'angular-resource': {
			deps: ['angular'],
			exports: 'angular-resource'
		}
	}
});

require([
	'angular',
	'./app/app.module'
], function (angular) {

	angular.bootstrap(document, ['kx.application']);
});