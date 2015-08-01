var React = require('react');
var Router = require('react-router');
var Auth = require('../services/AuthService');
var Navbar = require('./Navbar.react');
var Spinner = require('spin');

var Signup = React.createClass({
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

    // callback when successful to close signup modal
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

    var prefixNode = React.findDOMNode(this.refs.prefix);
    var firstNameNode = React.findDOMNode(this.refs.firstName);
    var lastNameNode = React.findDOMNode(this.refs.lastName);
    var emailNode = React.findDOMNode(this.refs.email);
    var passwordNode = React.findDOMNode(this.refs.password);

    Auth.signup({
      email: emailNode.value, 
      password: passwordNode.value,
      prefix: prefixNode.value || '',
      firstName: firstNameNode.value || '',
      lastName: lastNameNode.value || ''
    }, authCb);

    emailNode.value = '';
    passwordNode.value = '';
    prefixNode.value = '';
    firstNameNode.value = '';
    lastNameNode.value = '';
  },
  
  render: function() {
    return (
      <div className="signupForm">
        <div className="well">
          <button type="button" className="close" aria-label="Close" onClick={this.props.closeSignupModal}><span aria-hidden="true">&times;</span></button>
          <h2>Signup</h2>
          <div id="spinner"/>
          {this.state.authError ? <div className="authErrMsg">Email already taken.</div> : <div className="authErrMsg">* required</div> }
          <form className="form-horizontal" id="frmSignup" role="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="txtPrefix" className="col-sm-3 control-label">Prefix</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" id="txtPrefix" placeholder="Mr/Ms/Mrs" ref="prefix"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="txtFirstName" className="col-sm-3 control-label">First Name</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" placeholder="First Name" ref="firstName"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="txtLastName" className="col-sm-3 control-label">Last Name</label>
              <div className="col-sm-9">
                <input type="text" className="form-control" placeholder="Last Name" ref="lastName"/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="txtRegEmail" className="col-sm-3 control-label">*Email</label>
              <div className="col-sm-9">
                <input type="email" className="form-control" id="txtEmail" placeholder="Enter email" ref="email" required/>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="txtRegPass" className="col-sm-3 control-label">*Password</label>
              <div className="col-sm-9">
                <input type="password" className="form-control" id="txtPass" placeholder="Password" ref="password" required/>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-offset-5">
                Already have an account? <a onClick={this.props.switchModal}>Login</a>
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
    );
  }
});

module.exports = Signup;
