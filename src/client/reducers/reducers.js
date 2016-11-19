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
    calories: 0,
    weekday: []
}



var reducer = function(state, action) {
    state = state || initialState;

    if (action.type === actions.FETCH_DATA_SUCCESS) {
        var totalCalories = 0;
        for (var i = 0; i < action.data[0].plan.length; i++) {
            totalCalories += Number(action.data[0].plan[i].calories)
        }
        console.log('total calories', totalCalories);
        if (totalCalories == '') {
        	totalCalories = 0;
        }

        state = Object.assign({}, state, {
            weekday: action.data[0].plan,
            calories: totalCalories
        });

        return state;


    } else if (action.type === actions.FETCH_DATA_ERROR) {
        console.log(action.error, 'error');
        return action.error;
    } else if (action.type === actions.FETCH_UPDATE_SUCCESS) {

        return state;


    } else if (action.type === actions.FETCH_UPDATE_ERROR) {
        console.log(action.error, 'error');
        return action.error;
    } else if (action.type === actions.FETCH_USER_SUCCESS) {
        state = Object.assign({}, state, {
            userId: action.user[0].googleId
        });
        return state;
    } else if (action.type === actions.FETCH_USER_ERROR) {
        console.log(action.error);
    }



    return state;
}



module.exports = reducer;
