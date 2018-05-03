import angular from 'angular';
import ngResource from 'angular-resource';
import uiRouter from '@uirouter/angularjs/release/angular-ui-router'

import todo from './components/todo/todo.component';
import TodoStorageProxy from './services/TodoStorageProxy/TodoStorageProxy.factory';
import TodoApiStorage from './services/TodoApiStorage/TodoApiStorage.factory';
import TodoLocalStorage from './services/TodoLocalStorage/TodoLocalStorage.factory';
import todoEscape from './directives/todoEscape/todoEscape.directive';
import todoFocus from './directives/todoFocus/todoFocus.directive';

import todoRoutes from './todo.routes';

require('todomvc-app-css/index.css');

const MODULE_NAME = 'todo';
angular.module(MODULE_NAME, [
		ngResource,
		uiRouter
	])
	.constant('localStorage', window.localStorage)
	.constant('Date', window.Date)

	.component('todo', todo)
	.factory('TodoStorageProxy', TodoStorageProxy)
	.factory('TodoApiStorage', TodoApiStorage)
	.factory('TodoLocalStorage', TodoLocalStorage)
	.directive('todoEscape', todoEscape)
	.directive('todoFocus', todoFocus)
	.config(todoRoutes);

export default MODULE_NAME;
