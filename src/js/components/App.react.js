var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

// RouteHandler will render the active route in the App component depending on which route is matched in the URL
var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        <RouteHandler/>
      </div>
    );
  }

});

module.exports = App;
