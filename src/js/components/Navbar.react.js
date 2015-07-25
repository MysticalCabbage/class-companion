var React = require('react');
var Auth = require('../services/AuthService');
var Router = require('react-router');
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
            <Link to="/" className="navbar-brand">Class Companion</Link>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            { this.props.loggedIn ? 
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a onClick={this.handleLogout}>Logout</a>
                </li>
              </ul>
            : null }
            { this.props.loggedIn ? null :
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a onClick={this.props.openSignupModal}>Signup</a>
                </li>
              </ul>
            }
            { this.props.loggedIn ? null :
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a onClick={this.props.openLoginModal}>Login</a>
                </li>
              </ul>
            }
          </div>
        </div>
      </nav>
    );
  }

});

module.exports = Navbar;
