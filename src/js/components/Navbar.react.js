var React = require('react');
var Router = require('react-router');
var Link = Router.Link;


var Navbar = React.createClass({
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
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

});

module.exports = Navbar;