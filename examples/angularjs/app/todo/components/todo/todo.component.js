import angular from 'angular';

require('./todo.component.scss');

export default {
	bindings: {
		storage: '<'
	},
	template: require('./todo.component.html'),
	controller:
		class Constructor {
			/* @ngInject */
			constructor($scope, $state, $filter) {
				this._$scope = $scope;
				this._$state = $state;
				this._$filter = $filter;
			}

			$onInit() {
				this._$scope.$watch(() => this.getTodos(), (newVal) => {
					this.remainingCount = this._$filter('filter')(newVal, {completed: false}).length;
					this.completedCount = newVal.length - this.remainingCount;
					this.allChecked = !this.remainingCount;
				}, true);

				// Monitor the current route for changes and adjust the filter accordingly.
				this._$scope.$watch(() => this._$state.params.status, (newVal) => {
					const status = newVal || '';
					this.statusFilter = (status === 'active') ? {completed: false} : (status === 'completed') ? {completed: true} : {};
				})
			}

			$onChanges(/*changes*/) {
			}

			$onDestroy() {
				this._$scope.$destroy();
			}

			getTodos() {
				return this.storage.todos;
			}

			addTodo() {
				const newTodo = {
					title: this.newTodo.trim(),
					completed: false
				};

				if (!newTodo.title) {
					return;
				}

				this.saving = true;
				this.storage.insert(newTodo)
					.then(() => {
						this.newTodo = '';
					})
					.finally(() => {
						this.saving = false;
					});
			}

			editTodo(todo) {
				this.editedTodo = todo;
				// Clone the original todo to restore it on demand.
				this.originalTodo = angular.extend({}, todo);
			}

			saveEdits(todo, event) {
				// Blur events are automatically triggered after the form submit event.
				// This does some unfortunate logic handling to prevent saving twice.
				if (event === 'blur' && this._saveEvent === 'submit') {
					this._saveEvent = null;
					return;
				}

				this._saveEvent = event;

				if (this._reverted) {
					// Todo edits were reverted-- don't save.
					this._reverted = null;
					return;
				}

				todo.title = todo.title.trim();

				if (todo.title === this.originalTodo.title) {
					this.editedTodo = null;
					return;
				}

				this.storage[todo.title ? 'put' : 'delete'](todo)
					.catch(() => {
						todo.title = this.originalTodo.title;
					})
					.finally(() => {
						this.editedTodo = null;
					});
			}

			revertEdits(todo) {
				this.getTodos()[this.getTodos().indexOf(todo)] = this.originalTodo;
				this.editedTodo = null;
				this.originalTodo = null;
				this._reverted = true;
			}

			removeTodo(todo) {
				this.storage.delete(todo);
			}

			saveTodo(todo) {
				this.storage.put(todo);
			}

			toggleCompleted(todo, completed) {
				if (angular.isDefined(completed)) {
					todo.completed = completed;
				}
				this.storage.put(todo, this.getTodos().indexOf(todo))
					.catch(() => {
						todo.completed = !todo.completed;
					});
			}

			clearCompletedTodos() {
				this.storage.clearCompleted();
			}

			markAll(completed) {
				this.getTodos().forEach((todo) => {
					if (todo.completed !== completed) {
						this.toggleCompleted(todo, completed);
					}
				});
			}
		}
};
