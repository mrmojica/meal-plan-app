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

var FETCH_UPDATE_SUCCESS = 'FETCH_UPDATE_SUCCESS';
var fetchUpdateSuccess = function(data) {
    return {
        type: FETCH_UPDATE_SUCCESS,
        data: data

    };
};

var FETCH_UPDATE_ERROR= 'FETCH_UPDATE_ERROR';
var fetchUpdateError = function(error) {
    return {
        type: FETCH_UPDATE_ERROR,
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
       var url = 'http://localhost:8080/api/mealPlan';

       return fetch(url).then(function(response) {
           if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText);
               error.response = response;
               throw error;
           }
           return response.json();
       })

       .then(function(data) {
               console.log("MEAL DATA", data);
           return dispatch(
               fetchDataSuccess(data)
           );
       })
       .catch(function(error) {

           return dispatch(
               fetchDataError(error)
           );
       });
   }
};

//UPDATE DATA ACTION
var updateData = function(id, day, breakfast, lunch, dinner, sideDish, snack, dessert, calories) {
   return function(dispatch) {
       var url = 'http://localhost:8080/api/mealPlan/' + id;
       return fetch(url,
       {
          method: 'put',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
          mealHistory: [id, day, breakfast, lunch, dinner, sideDish, snack, dessert, calories]
        })


       }

        ).then(function(response) {
           if (response.status < 200 || response.status >= 300) {
               var error = new Error(response.statusText);
               error.response = response;
               throw error;
           }
           return response.json();
       })

       .then(function(data) {
               console.log("DATA", data);
           return dispatch(
               fetchUpdateSuccess(data)
           );
       })
       .catch(function(error) {

           return dispatch(
               fetchUpdateError(error)
           );
       });
   }
};

exports.FETCH_UPDATE_SUCCESS = FETCH_UPDATE_SUCCESS;
exports.fetchUpdateSuccess = fetchUpdateSuccess;
exports.FETCH_UPDATE_ERROR = FETCH_UPDATE_ERROR;
exports.fetchUpdateError = fetchUpdateError;

exports.FETCH_DATA_SUCCESS = FETCH_DATA_SUCCESS;
exports.fetchDataSuccess = fetchDataSuccess;
exports.FETCH_DATA_ERROR = FETCH_DATA_ERROR;
exports.fetchDataError = fetchDataError;
exports.MEAL_PLAN = MEAL_PLAN;
exports.mealPlan = mealPlan;
exports.fetchMeals = fetchMeals;
exports.updateData = updateData;


