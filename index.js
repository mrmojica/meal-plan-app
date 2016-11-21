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
require("!style!css!less!./css/index.less");

var Login = require('./src/client/components/Login');
var Main = require('./src/client/components/Main');



var App = function(props) {
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
	        <IndexRoute component={Login} />
          <Route path="/mealPlan" component={Main} />
      </Route>
    </Router>
    </Provider>
);


document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
    	routes, 
    	document.getElementById('app'));
});
