/* @ngInject */
function Constructor($sce) {
	'use strict';
	return function (text) {
		return $sce.trustAsHtml(text);
	};
}

export default Constructor;

