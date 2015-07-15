var React = require('react');
var Auth = require('./Auth.react.js');
var AuthActions = require('../actions/AuthActions');
var Router = require('react-router');
var Link = Router.Link;

var Signup = React.createClass({
  handleSignup: function(data){
    AuthActions.signup(data);
  },
  render: function() {
    return (
      <div>
        <Auth.Signup signup={this.handleSignup}/>
        <div><Link to="/login">Already have an account? Login</Link></div>
      </div>
    );
  }
});

module.exports = Signup;
