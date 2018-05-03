require('./todoClipboardText.component.scss');

export default {
	bindings: {
		text: '<'
	},
	template: require('./todoClipboardText.html'),
	// controllerAs: '$ctrl',	//default
	/* @ngInject */
	controller:
		class Constructor {
			/* @ngInject */
			constructor($element, $window, Clipboard) {
				this._$element = $element;
				this._$window = $window;
				this._Clipboard = Clipboard;
			}

			$onInit() {
				this.clipboard = new this._Clipboard(this._$element.find('button')[0]);
				this.clipboard.on('success', () => {
					this._$window.alert('Clipboard에 복사되었습니다.');
				});
				this.clipboard.on('error', () => {
					this._$window.alert('Clipboard에 복사에 실패하였습니다.');
				});
			}

			$onChanges(/*changes*/) {
			}

			$onDestroy() {
				this._$element.off();
				this.clipboard.destroy();
			}
		}
};
