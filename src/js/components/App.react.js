var React = require('react');
var Navbar = require('./Navbar.react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Auth = require('../services/AuthService');
var AuthStore = require('../stores/AuthStore');

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
