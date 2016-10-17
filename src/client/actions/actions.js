require('isomorphic-fetch');

var FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
var fetchDataSuccess = function(data) {
    return {
        type: FETCH_DATA_SUCCESS,
        data: data

    };
};

var FETCH_DATA_ERROR= 'FETCH_DATA_ERROR';
var fetchDataError = function(error) {
    return {
        type: FETCH_DATA_ERROR,
        error: error
    };
};

var MEAL_PLAN = 'MEAL_PLAN';
var mealPlan = function(day, breakfast, lunch, dinner, sideDish, snack, dessert, calories) {
    return {
        type: MEAL_PLAN,
        day: day,
        breakfast: breakfast,
        lunch: lunch,
        dinner: dinner,
        sideDish: sideDish,
        snack: snack,
        dessert: dessert,
        calories: calories
    };
};



var fetchMeals = function() {
   return function(dispatch) {
       var url = 'http://localhost:8080/';

       return fetch(url).then(function(response) {
           if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText);
               error.response = response;
               throw error;
           }
           return response.json();
       })

       .then(function(data) {
               console.log("WORD DATA", data);
           return dispatch(
               fetchInputSuccess(data)
           );
       })
       .catch(function(error) {

           return dispatch(
               fetchInputError(error)
           );
       });
   }
};


exports.FETCH_DATA_SUCCESS = FETCH_DATA_SUCCESS;
exports.fetchDataSuccess = fetchDataSuccess;
exports.FETCH_DATA_ERROR = FETCH_DATA_ERROR;
exports.fetchDataError = fetchDataError;
exports.MEAL_PLAN = MEAL_PLAN;
exports.mealPlan = mealPlan;


