require('./example.component.css');

export default {
	bindings: {},
	template: require('./example.html'),
	// controllerAs: '$ctrl',	//default
	/* @ngInject */
	controller:
		class Constructor {
			/* @ngInject */
			constructor(exampleService) {
				this.title = exampleService.title();
			}

			$onInit() {
			}

			$onChanges(/*changes*/) {
			}

			$onDestroy() {
			}
		}
};
