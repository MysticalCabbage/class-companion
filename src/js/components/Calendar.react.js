var React = require('react');
var DayNames = require('./DayNames.react');
var Week = require('./Week.react');

var Calendar = React.createClass({
	getInitialState: function() {
		return {
			month: this.props.selected.clone()
		};
	},

	componentWillMount: function(){
		console.log(this.state.month);
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
			<div>
				<div className="header">
					<i className="fa fa-angle-left" onClick={this.previous}></i>
					{this.renderMonthLabel()}
					<i className="fa fa-angle-right" onClick={this.next}></i>
				</div>
				<table className="attendanceCalendar table table-bordered">
				  <tr>
				    <th className="warning">Sunday</th>
				    <th className="danger">Monday</th>
				    <th className="info">Tuesday</th>
				    <th className="warning">Wednesday</th>
				    <th className="danger">Thursday</th>
				    <th className="info">Friday</th>
				    <th className="warning">Saturday</th>
				  </tr>
				  {this.renderWeeks()}
				</table>
			</div>
		)
	},

	renderWeeks: function() {
		var weeks = [],
			done = false,
			date = this.state.month.clone().startOf("month").add(-1, "w").day("Sunday"),
			monthIndex = date.month(),
			count = 0;

		while (!done) {
			weeks.push(<Week key={date.toString()} date={date.clone()} month={this.state.month} select={this.select} selected={this.props.selected} />);
			date.add(1, "w");
			done = count++ > 2 && monthIndex !== date.month();
			monthIndex = date.month();
		}

		return weeks;
	},

	renderMonthLabel: function() {
		return <span>{this.state.month.format("MMMM, YYYY")}</span>;
	}
});

module.exports = Calendar;
