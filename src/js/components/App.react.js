var React = require('react');
var Navbar = require('./Navbar.react');

var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Auth = require('../services/AuthService');
var authStore = require('../stores/AuthStore');

var App = React.createClass({
	getInitialState: function() {
		return {
		  isAuth: this._getLoginState()
		}
	},

	_getLoginState: function() {
	  return {
	    userLoggedIn: authStore.isLoggedIn(),
	    user: authStore.user,
	  };
	},

	componentDidMount: function() {
	  this.changeListener = this._onChange.bind(this);
	  authStore.addChangeListener(this.changeListener);
	},

	_onChange: function() {
	  this.setState({
	  	isAuth: this._getLoginState()
	  })
	},

	componentWillUnmount: function() {
	  authStore.removeChangeListener(this.changeListener);
	},

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

