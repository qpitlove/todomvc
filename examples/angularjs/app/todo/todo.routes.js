/* @ngInject */
function todoRoutes($stateProvider) {
	$stateProvider
		.state('todo', {
			abstract: true,
			component: 'todo', // The component's name
			resolve: {
				/* @ngInject */
				storage: (TodoStorageProxy) => {
					// // Get the correct module (API or localStorage).
					TodoStorageProxy.get(); // Fetch the todo records in the background.
					return TodoStorageProxy;
				}
			}
		});

	$stateProvider
		.state('todo.page', {
			url: '/todo?{status}'
		});
}

export default todoRoutes;
