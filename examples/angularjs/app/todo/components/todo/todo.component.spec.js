import angular from 'angular';

import todo from 'app/todo/todo.modules';

describe('todo.component:', () => {

	let $componentController;

	beforeEach(() => {
		angular.mock.module(todo);

		angular.mock.inject((_$componentController_) => {
			$componentController = _$componentController_;
		});
	});

	it('should contain the starter url', () => {
		// Here we are passing actual bindings to the component
		const $ctrl = $componentController('todoComponent', null, {});

		expect($ctrl.url).toBe('https://github.com/preboot/angular-webpack');
	});
});
