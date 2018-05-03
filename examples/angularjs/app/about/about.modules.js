import angular from 'angular';
import aboutComponent from './components/about/about.component';
import htmlunsafeFilter from './filters/htmlunsafe/htmlunsafe.filter';
import routing from './about.routes';

const MODULE_NAME = 'about';

angular.module(MODULE_NAME, [])
	.component(MODULE_NAME, aboutComponent)
	.filter('htmlunsafe', htmlunsafeFilter)
	.config(routing);

export default MODULE_NAME;
