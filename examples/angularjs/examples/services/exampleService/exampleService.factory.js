/* @ngInject */
function Constructor($state) {
	return {
		title: () => $state.current.name
	}
}

export default Constructor;
