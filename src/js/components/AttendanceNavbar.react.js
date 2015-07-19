var React = require('react');
var Router = require('react-router');

var AttendanceNavbar = React.createClass({
  saveAttendance: function(){
    this.props.saveAttendance();
  },

  render: function() {
    return (
      <div className="attendanceNavbar container">
        <button className="btn btn-default" onClick={this.saveAttendance}>Save Attendance</button>
      </div>
    );
  }

});

module.exports = AttendanceNavbar;
