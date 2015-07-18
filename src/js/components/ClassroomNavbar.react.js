var React = require('react');
var Router = require('react-router');
var AuthActions = require('../actions/AuthActions');
var Auth = require('../services/AuthService');

var Link = Router.Link;


var ClassroomNavbar = React.createClass({
  handleAttendance: function(){

  },

  render: function() {
    return (
      <nav className="classroomNavbar container navbar navbar-default">
        <div className="container">
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li>
                <a onClick={this.handleAttendance}>Attendance</a>
              </li>
            </ul>
            <ul className="nav navbar-nav">
              <li>
                <a>Random</a>
              </li>
            </ul>
            <ul className="nav navbar-nav">
              <li>
                <a>Group</a>
              </li>
            </ul>
            <ul className="nav navbar-nav">
              <li>
                <a>Timer</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

});

module.exports = ClassroomNavbar;
