var React = require('react');
var AuthActions = require('../actions/AuthActions');
var Router = require('react-router');
var Link = Router.Link;
var Auth = require('../services/AuthService');
var Navbar = require('./Navbar.react');

var Signup = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();

    var prefixNode = React.findDOMNode(this.refs.prefix);
    var firstNameNode = React.findDOMNode(this.refs.firstName);
    var lastNameNode = React.findDOMNode(this.refs.lastName);
    var emailNode = React.findDOMNode(this.refs.email);
    var passwordNode = React.findDOMNode(this.refs.password);

    Auth.signup({
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
      <div className="signupForm">
        <Navbar />
        <div className="container">
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
                  <div className="col-sm-offset-5">
                    Already have an account? <Link to="/login">Login</Link>
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
      </div>
    );
  }
});

module.exports = Signup;
