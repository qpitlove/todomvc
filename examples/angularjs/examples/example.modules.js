import angular from 'angular';
import component from './components/example/example.component';
import service from './services/exampleService/exampleService.factory';
import routing from './example.routes';

const MODULE_NAME = 'example';

angular.module(MODULE_NAME, [])
	.component('example', component)
	.factory('exampleService', service)
	.config(routing);

export default MODULE_NAME;
