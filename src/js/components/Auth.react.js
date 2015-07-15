var React = require('react');
var authActions = require('../actions/AuthActions');
var authStore = require('../stores/AuthStore');

var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Navigation = Router.Navigation;

var Auth = {};

Auth.Authentication = {
  statics: {
    willTransitionTo: function (transition) {
      var nextPath = transition.path;

      // To delete line 20 and uncomment line 24 when we get authStore.checkAuth() to work
      var test = true;

      // Redirect to /login if false. 
      if (!test) {
      // if (!authStore.checkAuth()) {
        transition.redirect('/login',{},
          { 'nextPath' : nextPath });
      }
    }
  }
};

Auth.Signup = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();

    var prefixNode = React.findDOMNode(this.refs.prefix);
    var firstNameNode = React.findDOMNode(this.refs.firstName);
    var lastNameNode = React.findDOMNode(this.refs.lastName);
    var emailNode = React.findDOMNode(this.refs.email);
    var passwordNode = React.findDOMNode(this.refs.password);

    this.props.signup({
      email: emailNode.value, 
      password: passwordNode.value,
      prefix: prefixNode.value,
      firstName: firstNameNode.value,
      lastName: lastNameNode.value
    });

    emailNode.value = '';
    passwordNode.value = '';
    prefixNode.value = '';
    firstNameNode.value = '';
    lastNameNode.value = '';
  },
  render: function() {
    return (
      <form id="frmSignup" role="form" onSubmit={this.handleSubmit}>
        <h2>Signup</h2>
        <div>
          <label for="txtPrefix">Prefix</label>
          <input type="text" id="txtPrefix" placeholder="Mr/Ms/Mrs" ref="prefix" required/>
        </div>
        <div>
          <label for="txtFirstName">First Name</label>
          <input type="text" id="txtFirstName" placeholder="First Name" ref="firstName" required/>
        </div>
        <div>
          <label for="txtLastName">Last Name</label>
          <input type="text" id="txtLastName" placeholder="Last Name" ref="lastName" required/>
        </div>
        <div>
          <label for="txtRegEmail">Email address</label>
          <input type="email" id="txtEmail" placeholder="Enter email" ref="email" required/>
        </div>
        <div>
          <label for="txtRegPass">Password</label>
          <input type="password" id="txtPass" placeholder="Password" ref="password" required/>
        </div>
        <button type="submit">Signup</button>
      </form>
    );
  }
});

Auth.Login = React.createClass({
  mixins: [ Router.Navigation],
  getInitialState: function () {
    return {
      error: false
    };
  },

  handleSubmit: function(e){
    e.preventDefault();

    // Line 79 and 89-93 are for the router. 
    // Need to figure out how to redirect after authentication once AuthStore is set up
    // Follow this example: https://github.com/rackt/react-router/blob/de9f8098baee3b5d24b1c337dc9aa0e7439a295e/examples/auth-flow/app.js
    // getQuery() returns a hash of the currently active query params.

    // var nextPath = this.getQuery().nextPath;

    var emailNode = React.findDOMNode(this.refs.email);
    var passwordNode = React.findDOMNode(this.refs.password);

    this.props.login({
      email: emailNode.value, 
      password: passwordNode.value
    });

    // if (nextPath) {
    //   this.transitionTo(nextPath);
    // } else {
    //   this.replaceWith('/teacherDashboard');
    // }
    
    emailNode.value = '';
    passwordNode.value = '';
  },
  render: function() {
    return (
      <form id="frmLogin" role="form" onSubmit={this.handleSubmit}>
        <h1>Login</h1>
        <div>
          <label for="txtEmail">Email address</label>
          <input type="email" id="txtEmail" placeholder="Enter email" ref="email" required/>
        </div>
        <div>
          <label for="txtPass">Password</label>
          <input type="password" id="txtPass" placeholder="Password" ref="password" required/>
        </div>
        <button type="submit">Login</button>
      </form>
    );
  }
});

Auth.Logout = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();

    this.props.logout();
  },
  render: function(){
    return (
      <form id="frmLogout" role="form" onSubmit={this.handleSubmit}>
        <button type="submit">Logout</button>
      </form>
    );
  }
});

module.exports = Auth;
