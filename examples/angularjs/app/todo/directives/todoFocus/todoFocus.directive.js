/* @ngInject */
function Constructor($timeout) {
	'use strict';

	return function (scope, elem, attrs) {
		scope.$watch(attrs.todoFocus, function (newVal) {
			if (newVal) {
				$timeout(function () {
					elem[0].select();
				}, 0, false);
			}
		});
	};
}

export default Constructor;
