/* @ngInject */
function Constructor() {
	'use strict';

	return {
		restrict: 'A',
		link: function (scope, element) {
			offCompositionEvent(element);
		}
	};

	// In composition mode, users are still inputing intermediate text buffer,
	// hold the listener until composition is done. but korean input must recognize when composition doing
	function offCompositionEvent(element) {
		element.off('compositionstart').off('compositionend');
	}
}

export default Constructor;
