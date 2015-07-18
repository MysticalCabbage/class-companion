var React = require('react');
var Router = require('react-router');


var ClassroomNavbar = React.createClass({
  handleAttendance: function(){
    this.props.onAttendanceClick();
  },

  showTimerOptions: function(){
    this.props.showTimerOptions();
  },

  render: function() {
    return (
      <nav className="classroomNavbar container navbar navbar-default">
        <div className="container">
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
              <li>
                <a onClick={this.handleAttendance}><i className="fa fa-check-square-o"> Attendance</i></a>
              </li>
            </ul>
            <ul className="nav navbar-nav">
              <li>
                <a><i className="fa fa-random"> Random</i></a>
              </li>
            </ul>
            <ul className="nav navbar-nav">
              <li>
                <a><i className="fa fa-users"> Group</i></a>
              </li>
            </ul>
            <ul className="nav navbar-nav">
              <li>
                <a onClick={this.showTimerOptions}><i className="fa fa-clock-o"> Timer</i></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

});

module.exports = ClassroomNavbar;
