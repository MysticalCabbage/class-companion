var React = require('react');
var ClassroomStore = require('../stores/ClassroomStore');
var Calendar = require('./Calendar.react');

var AttendanceCalendar = React.createClass({
  render: function(){
    return (
    	<div className="attendanceCalendar">
	    	<Calendar selected={moment().startOf("day")} />
	    </div>
    );
  }
});

module.exports = AttendanceCalendar;
