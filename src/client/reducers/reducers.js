var actions = require('./actions');

// var qCounter = 0;

var initialState = {
	id: 999,
	day: '',
	breakfast: '',
	lunch: '',
	dinner: '',
	sideDish: '',
	snack: '',
	dessert: '',
	calories: ''
}


var reducer = function(state, action) {
	// console.log('actions', actions);
	state = state || initialState;

	if(action.type === actions.FETCH_DATA_SUCCESS) {
		console.log('success worked!', action);

		return state;


	}

	else if (action.type === actions.FETCH_DATA_ERROR) {
		console.log(action.error, 'error');
		return action.error;
	}
	


    return state;
}



module.exports = reducer;