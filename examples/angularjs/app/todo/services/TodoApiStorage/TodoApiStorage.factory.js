import angular from 'angular';

/* @ngInject */
function Constructor($resource) {
	'use strict';

	var store = {
		todos: [],

		api: $resource('/api/todos/:id', null,
			{
				update: {method: 'PUT'},
				query: {method: 'GET', isArray: true},
			}
		),

		clearCompleted: function () {
			var originalTodos = store.todos.slice(0);
			var incompleteTodos = store.todos.filter(function (todo) {
				return !todo.completed;
			});

			angular.copy(incompleteTodos, store.todos);

			return store.api.delete().$promise
				.catch(function error() {
					angular.copy(originalTodos, store.todos);
				});
		},

		delete: function (todo) {
			var originalTodos = store.todos.slice(0);

			store.todos.splice(store.todos.indexOf(todo), 1);
			return store.api.delete({id: todo.id}).$promise
				.catch(function () {
					angular.copy(originalTodos, store.todos);
				});
		},

		get: function () {
			return store.api.query().$promise
				.then(function (resp) {
					angular.copy(resp, store.todos);
				});
		},

		insert: function (todo) {
			var originalTodos = store.todos.slice(0);
			return store.api.save(todo).$promise
				.then(function (resp) {
					store.todos.push(resp);
				})
				.catch(function () {
					angular.copy(originalTodos, store.todos);
				});
		},

		put: function (todo) {
			return store.api.update({id: todo.id}, todo).$promise
				.then(function (resp) {
					store.todos[store.todos.indexOf(todo)] = resp;
				});
		}
	};

	return store;
}

export default Constructor;
