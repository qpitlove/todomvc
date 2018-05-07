import angular from 'angular';

/* @ngInject */
function Constructor($q, Date, localStorage, uuid) {
	'use strict';

	var STORAGE_ID = 'todos-angularjs';

	var store = {
		todos: [],

		_getFromLocalStorage: function () {
			return angular.fromJson(localStorage.getItem(STORAGE_ID) || '[]');
		},

		_saveToLocalStorage: function (todos) {
			localStorage.setItem(STORAGE_ID, angular.toJson(todos));
		},

		clearCompleted: function () {
			const incompleteTodos = store.todos.filter(function (todo) {
				return !todo.completed;
			});
			angular.copy(incompleteTodos, store.todos);

			store._saveToLocalStorage(store.todos);
			return $q.when(store.todos);
		},

		delete: function (todo) {
			store.todos.splice(store.todos.indexOf(todo), 1);

			store._saveToLocalStorage(store.todos);
			return $q.when(store.todos);
		},

		get: function () {
			angular.copy(store._getFromLocalStorage(), store.todos);
			return $q.when(store.todos);
		},

		insert: function (todo) {
			todo = angular.extend(todo, {
				id: uuid.v4(),
				created: Date.now()
			});

			store.todos.push(todo);

			store._saveToLocalStorage(store.todos);
			return $q.when(store.todos);
		},

		put: function (todo) {
			const index = store.todos.indexOf(todo);
			todo = angular.extend(todo, {
				updated: Date.now()
			});

			store.todos[index] = todo;

			store._saveToLocalStorage(store.todos);
			return $q.when(store.todos);
		}
	};
	return store;
}

export default Constructor;
