var React = require('react');
var Navbar = require('./Navbar.react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Auth = require('../services/AuthService');
var AuthStore = require('../stores/AuthStore');

var Home = React.createClass({
	componentWillMount: function(){
	  if(!AuthStore.checkAuth()){
	    this.render = function () {
	      return false;
	    }
	    location.hash = '/login';
	  }
	},

  render: function() {
    return (
      <div className="home container">
      	Hello! I am the home page! Please add content and make me pretty.
      </div>
    );
  }

});

module.exports = Home;
