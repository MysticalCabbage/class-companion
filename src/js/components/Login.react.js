var React = require('react');
var AuthActions = require('../actions/AuthActions');
var Router = require('react-router');
var Link = Router.Link;
var Auth = require('../services/AuthService');

var Login = React.createClass({ 
  getInitialState: function () {
    return {
      error: false
    };
  },

  handleSubmit: function(e){
    e.preventDefault();

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
      <div className="signupForm container">
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
                <div className="col-sm-offset-5">
                  Dont have an account? <Link to="/signup">Signup</Link>
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
      </div>
    );
  }
});

module.exports = Login;
