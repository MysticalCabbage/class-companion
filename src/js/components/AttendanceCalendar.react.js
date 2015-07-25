var React = require('react');
var DayNames = require('./DayNames.react');
var AttendanceCalendarWeek = require('./AttendanceCalendarWeek.react');
var ClassroomStore = require('../stores/ClassroomStore');
var _ = require('underscore');

var AttendanceCalendar = React.createClass({
	getInitialState: function() {
		return {
			month: moment().startOf("day")
		};
	},

	// Change state to previous month
	previous: function() {
		var month = this.state.month;
		// Moment.js function which mutates the original moment by adding time (usage: moment().add(Number, String))
		month.add(-1, "M");
		this.setState({ month: month });
	},

	// Change state to next month
	next: function() {
		var month = this.state.month;
		month.add(1, "M");
		this.setState({ month: month });
	},

	render: function() {
		return (
			<div className="panel panel-primary">
			  <div className="panel-heading">
			    <h3 className="panel-title">Attendance</h3>
			  </div>
			  <div className="panel-body">
			  	<div className="attendanceCalendar">
			  		<nav>
			  		  <ul className="pagination">
			  		    <li>
			  		      <a onClick={this.previous} aria-label="Previous">
			  		        <span aria-hidden="true">&laquo;</span>
			  		      </a>
			  		    </li>
			  		    {this.renderMonthLabel()}
			  		    <li>
			  		      <a onClick={this.next} aria-label="Next">
			  		        <span aria-hidden="true">&raquo;</span>
			  		      </a>
			  		    </li>
			  		  </ul>
			  		</nav>
			  		<table className="attendanceCalendar table table-bordered">
			  			<thead>
			  			  <tr>
			  			    <th className="warning">Sunday</th>
			  			    <th className="danger">Monday</th>
			  			    <th className="info">Tuesday</th>
			  			    <th className="warning">Wednesday</th>
			  			    <th className="danger">Thursday</th>
			  			    <th className="info">Friday</th>
			  			    <th className="warning">Saturday</th>
			  			  </tr>
			  		  </thead>
			  		  <tbody>
			  		  {this.renderWeeks()}
			  		  </tbody>
			  		</table>
			  	</div>
			  </div>
			</div>
		)
	},

	renderWeeks: function() {
		var list = this.props.list;
		var weeks = [],
			done = false,
			date = this.state.month.clone().startOf("month").add("w" -1).day("Sunday"),
			monthIndex = date.month(),
			count = 0;

		while (!done) {
			weeks.push(<AttendanceCalendarWeek list={list} key={date.toString()} date={date.clone()} month={this.state.month} select={this.select} selected={this.props.selected} />);
			date.add(1, "w");
			done = count++ > 2 && monthIndex !== date.month();
			monthIndex = date.month();
		}

		return weeks;
	},

	renderMonthLabel: function() {
		return <li><a href="#">{this.state.month.format("MMMM, YYYY")}</a></li>;
	}
});

module.exports = AttendanceCalendar;
