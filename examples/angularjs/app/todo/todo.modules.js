import angular from 'angular';
import uiRouter from '@uirouter/angularjs/release/angular-ui-router'
import {ngFontawesome} from 'exports-loader?ngFontawesome="picardy.fontawesome"!angular-fontawesome/dist/angular-fontawesome';

import Clipboard from 'clipboard/dist/clipboard';
import uuid from 'uuid';

import todo from './components/todo/todo.component';
import todoClipboardText from './components/todoClipboardText/todoClipboardText.component';
import TodoStorageProxy from './services/TodoStorageProxy/TodoStorageProxy.factory';
import TodoApiStorage from './services/TodoApiStorage/TodoApiStorage.factory';
import TodoLocalStorage from './services/TodoLocalStorage/TodoLocalStorage.factory';
import todoEscape from './directives/todoEscape/todoEscape.directive';
import todoFocus from './directives/todoFocus/todoFocus.directive';
import todoCompositionEventOff from './directives/todoCompositionEventOff/todoCompositionEventOff.directive';

import todoRoutes from './todo.routes';

require('font-awesome/css/font-awesome.css');
require('todomvc-app-css/index.css');

const MODULE_NAME = 'todo';
angular.module(MODULE_NAME, [
		uiRouter,
		ngFontawesome
	])
	.constant('localStorage', window.localStorage)
	.constant('Date', window.Date)
	.constant('Clipboard', Clipboard)
	.constant('uuid', uuid)

	.component('todo', todo)
	.component('todoClipboardText', todoClipboardText)
	.factory('TodoStorageProxy', TodoStorageProxy)
	.factory('TodoApiStorage', TodoApiStorage)
	.factory('TodoLocalStorage', TodoLocalStorage)
	.directive('todoEscape', todoEscape)
	.directive('todoFocus', todoFocus)
	.directive('todoCompositionEventOff', todoCompositionEventOff)
	.config(todoRoutes);

export default MODULE_NAME;
