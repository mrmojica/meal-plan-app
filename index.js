var React = require('react');
var ReactDOM = require('react-dom');
var store = require('./src/client/store');
var Provider = require('react-redux').Provider;
var Main = require('./src/client/components/Main');

var App = function() {
    return (
        <div>
        	<Main />
        </div>
    );
};

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(
    	<Provider store={store}>
    	<App />
    	</Provider>, 
    	document.getElementById('app'));
});
