var React = require('react');
var Auth = require('./Auth.react.js');
var AuthActions = require('../actions/AuthActions');
var Router = require('react-router');
var Link = Router.Link;

var Login = React.createClass({
  handleLogin: function(credentials){
    AuthActions.login(credentials);
  },
  render: function() {
    return (
      <div>
        <Auth.Login login={this.handleLogin}/>
        <div><Link to="/signup">Dont have an account? Register</Link></div>
      </div>
    );
  }
});

module.exports = Login;
