/**
 * Services that persists and retrieves todos from localStorage or a backend API
 * if available.
 *
 * They both follow the same API, returning promises for all changes to the
 * model.
 */

/* @ngInject */
function Constructor($http, $injector) {
	'use strict';

	// Detect if an API backend is present. If so, return the API module, else
	// hand off the localStorage adapter
	return $http.get('/api')
		.then(function () {
			return $injector.get('TodoApiStorage');
		}, function () {
			return $injector.get('TodoLocalStorage');
		});
}

export default Constructor;
