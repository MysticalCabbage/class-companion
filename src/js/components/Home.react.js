var React = require('react');
var Navbar = require('./Navbar.react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Auth = require('../services/AuthService');
var AuthStore = require('../stores/AuthStore');

var Home = React.createClass({
	getInitialState: function(){
	  return {
	    loggedIn: AuthStore.checkAuth()
	  }
	},

	componentDidMount: function(){
	  AuthStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function(){
	  AuthStore.removeChangeListener(this._onChange);
	},

	// Whenever data in the store changes, fetch data from the store and update the component state
	_onChange: function(){
		console.log('triggered');
	  this.setState({
	  	loggedIn: AuthStore.checkAuth()
	  })
	},

  render: function() {
    return (
      <div className="home">
      	<Navbar loggedIn = {this.state.loggedIn}/>
	      <div className="container">
	      	Hello! I am the home page! Please add content and make me pretty.
	      </div>
	    </div>
    );
  }

});

module.exports = Home;
