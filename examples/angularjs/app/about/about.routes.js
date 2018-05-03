/* @ngInject */
function exampleRoutes($stateProvider) {
	$stateProvider
		.state('about', {
			abstract: true,
			component: 'about'
		});

	$stateProvider
		.state('about.page', {
			url: '/about'
		});
}

export default exampleRoutes;
