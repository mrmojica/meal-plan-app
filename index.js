var React = require('react');
var ReactDOM = require('react-dom');
var store = require('./src/client/store');
var Provider = require('react-redux').Provider;

var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var IndexRoute = router.IndexRoute;
var hashHistory = router.hashHistory;
var Link = router.Link;

var Main = require('./src/client/components/Main');



var App = function() {
    return (
        <div>
        	{props.children}
        </div>
    );
};


var routes = (
	<Provider store={store}>
    <Router history={hashHistory}>
    	<Route path="/" component={App}>
	        <IndexRoute component={Landing} />
          <Route path="/mealPlan" component={Main} />
      </Route>
    </Router>
    </Provider>
);


document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
    	<Provider store={store}>
    	<App />
    	</Provider>, 
    	document.getElementById('app'));
});
