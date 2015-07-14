var React = require('react');
var Navbar = require('./Navbar.react');
var TeacherDashboard = require('./TeacherDashboard.react');
var Auth = require('./Auth.react');

var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;

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

