var React = require('react');
var Router = require('react-router');
var Auth = require('../services/AuthService');
var Navbar = require('./Navbar.react');
var Spinner = require('spin');

var Login = React.createClass({ 
  getInitialState: function () {
    return {
      error: false,
      authError: false
    };
  },

  handleSubmit: function(e){
    e.preventDefault();

    // clear previous error message upon retry
    this.setState({authError: false});

    var spinnerEl = document.getElementById('spinner');
    var spinner = new Spinner().spin(spinnerEl)
    
    // callback when successful closes login modal
    // callback when error to stop spinner and display error message
    var authCb = function(err, success){
      if(err){
        spinner.stop();
        this.setState({authError: true});
      } else {
        this.props.closeLoginModal();
        spinner.stop();
      }
    }.bind(this);

    var emailNode = React.findDOMNode(this.refs.email);
    var passwordNode = React.findDOMNode(this.refs.password);

    Auth.login({
      email: emailNode.value, 
      password: passwordNode.value
    }, authCb);
    
    emailNode.value = '';
    passwordNode.value = '';
  },
  
  render: function() {
    return (
      <div className="loginForm">
        <div className="well">
          <button type="button" className="close" aria-label="Close" onClick={this.props.closeLoginModal}><span aria-hidden="true">&times;</span></button>
          <h2>Login</h2>
          <div id="spinner"/>
          {this.state.authError ? <div className="authErrMsg">Invalid Email or Password</div> : null}
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
