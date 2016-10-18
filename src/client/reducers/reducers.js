var actions = require('../actions/actions');
// var initialState = require('./initialState');

// var qCounter = 0;

var initialState = {
	id: 0,
	day: '',
	breakfast: '',
	lunch: '',
	dinner: '',
	sideDish: '',
	snack: '',
	dessert: '',
	calories: '',
	weekday: []
}


var reducer = function(state, action) {
	// console.log('actions', actions);
	state = state || initialState;

	if(action.type === actions.FETCH_DATA_SUCCESS) {
		// console.log('success worked!', action);
		state = Object.assign({}, state, {
			weekday: action.data
		});
		// console.log('newState', state);
		return state;


	}

	else if (action.type === actions.FETCH_DATA_ERROR) {
		console.log(action.error, 'error');
		return action.error;
	}

	else if (action.type === actions.FETCH_UPDATE_SUCCESS) {
		// console.log('update success worked!', action);
		return state;


	}

	else if (action.type === actions.FETCH_UPDATE_ERROR) {
		console.log(action.error, 'error');
		return action.error;
	}
	


    return state;
}



module.exports = reducer;