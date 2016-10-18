var actions = require('../actions/actions');
// var initialState = require('./initialState');

// var qCounter = 0;

var initialState = {
	userId: "null",
	id: 0,
	day: '',
	breakfast: '',
	lunch: '',
	dinner: '',
	sideDish: '',
	snack: '',
	dessert: '',
	calories: '',
	userData:[],
	weekday: []
}


var reducer = function(state, action) {
	// console.log('actions', actions);
	state = state || initialState;

	if(action.type === actions.FETCH_DATA_SUCCESS) {
		console.log('fetch_data!', action.data[0].plan);
		state = Object.assign({}, state, {
			weekday: action.data[0].plan
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

	else if (action.type === actions.FETCH_USER_SUCCESS) {
			console.log("user ", action.user);
			state = Object.assign({}, state, {
			userData: action.user[0].plan,
			userId: action.user[0].googleId
		});
			return state;
		}
		else if (action.type === actions.FETCH_USER_ERROR) {
			console.log(action.error);
		}
	


    return state;
}



module.exports = reducer;