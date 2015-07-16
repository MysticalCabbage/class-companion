var React = require('react');
var Router = require('react-router');
var AuthActions = require('../actions/AuthActions');
var Auth = require('../services/AuthService');

var Link = Router.Link;


var Navbar = React.createClass({
  handleLogout: function(){
    Auth.logout();
  },
  render: function() {
    return (
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">Mystical Cabbage</Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a onClick={this.handleLogout}>Logout</a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

});

module.exports = Navbar;
