var React = require('react');
var Router = require('react-router');
var Auth = require('../services/AuthService');
var Navbar = require('./Navbar.react');

var Login = React.createClass({ 
  getInitialState: function () {
    return {
      error: false
    };
  },

  handleSubmit: function(e){
    e.preventDefault();
    
    this.props.closeLoginModal();

    var emailNode = React.findDOMNode(this.refs.email);
    var passwordNode = React.findDOMNode(this.refs.password);

    Auth.login({
      email: emailNode.value, 
      password: passwordNode.value
    });
    
    emailNode.value = '';
    passwordNode.value = '';
  },
  
  render: function() {
    return (
      <div className="loginForm">
        <div className="well">
          <button type="button" className="close" aria-label="Close" onClick={this.props.closeLoginModal}><span aria-hidden="true">&times;</span></button>
          <h2>Login</h2>
          <form className="form-horizontal" id="frmLogin" role="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="txtEmail" className="col-sm-3 control-label">Email</label>
              <div className="col-sm-9">
                <input type="email" className="form-control" id="txtEmail" placeholder="Enter email" ref="email" required/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="txtPass" className="col-sm-3 control-label">Password</label>
              <div className="col-sm-9">
                <input type="password" className="form-control" id="txtPass" placeholder="Password" ref="password" required/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-5">
                Dont have an account? <a onClick={this.props.switchModal}>Signup</a>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-9 col-sm-3">
                <button type="submit" className="btn btn-default btn-block submit-button">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
});

module.exports = Login;
