import angular from 'angular';

require('angular/angular-csp.css');

import uiRouter from '@uirouter/angularjs/release/angular-ui-router';

import todoModule from 'app/todo/todo.modules';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [
		uiRouter,
		todoModule
	])
	.component(MODULE_NAME, {
		template: '<ui-view></ui-view>'
	})
	/* @ngInject */
	.config(($locationProvider) => {
		$locationProvider.html5Mode(true);
	})
	/* @ngInject */
	.config(($urlRouterProvider) => {
		$urlRouterProvider.otherwise('/todo');
	});

export default MODULE_NAME;
