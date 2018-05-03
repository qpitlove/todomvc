require('./about.component.scss');

export default {
	bindings: {},
	template: require('./about.html'),
	/* @ngInject */
	controller:
		class Constructor {
			/* @ngInject */
			constructor() {
				this.title = 'about';
				this.desc = `<p>Helping you <strong>select</strong> an MV* framework</p>`;
			}

			$onInit() {
			}

			$onChanges(/*changes*/) {
			}

			$onDestroy() {
			}
		}
};
