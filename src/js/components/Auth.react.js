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
      <div className="signupForm container">
        <div className="row">
          <div className="col-sm-5 well">
            <h2>Signup</h2>
            <form className="form-horizontal" id="frmSignup" role="form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label for="txtPrefix" className="col-sm-3 control-label">Prefix</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" id="txtPrefix" placeholder="Mr/Ms/Mrs" ref="prefix" required/>
                </div>
              </div>
              <div className="form-group">
                <label for="txtFirstName" className="col-sm-3 control-label">First Name</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" placeholder="First Name" ref="firstName" required/>
                </div>
              </div>
              <div className="form-group">
                <label for="txtLastName" className="col-sm-3 control-label">Last Name</label>
                <div className="col-sm-9">
                  <input type="text" className="form-control" placeholder="Last Name" ref="lastName" required/>
                </div>
              </div>
              <div className="form-group">
                <label for="txtRegEmail" className="col-sm-3 control-label">Email</label>
                <div className="col-sm-9">
                  <input type="email" className="form-control" id="txtEmail" placeholder="Enter email" ref="email" required/>
                </div>
              </div>
              <div className="form-group">
                <label for="txtRegPass" className="col-sm-3 control-label">Password</label>
                <div className="col-sm-9">
                  <input type="password" className="form-control" id="txtPass" placeholder="Password" ref="password" required/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-9 col-sm-3">
                  <button type="submit" className="btn btn-default btn-block submit-button">Sign up</button>
                </div>
              </div>
            </form>
          </div> 
        </div> 
      </div>
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
      <div className="loginForm container">
        <div className="row">
          <div className="col-sm-5 well">
            <h2>Login</h2>
            <form className="form-horizontal" id="frmLogin" role="form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label for="txtEmail" className="col-sm-3 control-label">Email</label>
                <div className="col-sm-9">
                  <input type="email" className="form-control" id="txtEmail" placeholder="Enter email" ref="email" required/>
                </div>
              </div>
              <div className="form-group">
                <label for="txtPass" className="col-sm-3 control-label">Password</label>
                <div className="col-sm-9">
                  <input type="password" className="form-control" id="txtPass" placeholder="Password" ref="password" required/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-offset-9 col-sm-3">
                  <button type="submit" className="btn btn-default btn-block submit-button">Sign in</button>
                </div>
              </div>
            </form>
          </div> 
        </div> 
      </div>
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
