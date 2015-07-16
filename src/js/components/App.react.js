var React = require('react');
var Navbar = require('./Navbar.react');

var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Auth = require('../services/AuthService');
var authStore = require('../stores/AuthStore');
var Authenticated = require('./Auth.react');

var App = React.createClass({

  render: function() {
    return (
      <div className="app">
        <Navbar />
      	<RouteHandler/>
      </div>
    );
  }

});

module.exports = App;

