var React = require('react');
var authActions = require('../actions/authActions');
var authStore = require('../stores/authStore');

var Auth = {};

Auth.Signup = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();

    var emailNode = React.findDOMNode(this.refs.email);
    var passwordNode = React.findDOMNode(this.refs.password);

    this.props.signup({
      email: emailNode.value, 
      password: passwordNode.value
    });

    emailNode.value = '';
    passwordNode.value = '';
  },
  render: function() {
    return (
      <form id="frmSignup" role="form" onSubmit={this.handleSubmit}>
        <h2>Signup</h2>
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
  handleSubmit: function(e){
    e.preventDefault();

    var emailNode = React.findDOMNode(this.refs.email);
    var passwordNode = React.findDOMNode(this.refs.password);

    this.props.login({
      email: emailNode.value, 
      password: passwordNode.value
    });
    
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
      <div>
        <hr/>
        <form id="frmLogout" role="form" onSubmit={this.handleSubmit}>
          <button type="submit">Logout</button>
        </form>
      </div>
    );
  }
});

module.exports = Auth;
