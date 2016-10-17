var React = require('react');
var ReactDOM = require('react-dom');
var Main = require('./src/client/components/Main');

var App = function() {
    return (
        <div>
        	<Main />
        </div>
    );
};

document.addEventListener('DOMContentLoaded', function() {
    ReactDOM.render(<App />, document.getElementById('app'));
});
