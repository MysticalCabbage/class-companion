var React = require('react');
var _ = require('underscore');

var AttendanceCalendarWeek = React.createClass({
	render: function() {
		var days = [],
			date = this.props.date,
			month = this.props.month;

		for (var i = 0; i < 7; i++) {
			var day = {
				name: date.format("dd").substring(0, 1),
				number: date.date(),
				month: date.month()+1,
				year: date.year(),
				isCurrentMonth: date.month() === month.month(),
				isToday: date.isSame(new Date(), "day"),
				date: date
			};

			var list = this.props.list;
			var absentStudents = [];
			var absentStudentsQuery = _.map(list, function(student, index){
				var queryDate = day.month + '-' + day.number + '-' + day.year;
				if(student.attendance[queryDate] && student.attendance[queryDate] === 'Absent'){
					absentStudents.push(<li>{student.studentTitle}</li>)
				}
			});
			var lateStudents = [];
			var lateStudentsQuery = _.map(list, function(student, index){
				var queryDate = day.month + '-' + day.number + '-' + day.year;
				if(student.attendance[queryDate] && student.attendance[queryDate] === 'Late'){
					lateStudents.push(<li>{student.studentTitle}</li>)
				}
			});
			days.push(
				<td key={day.date.toString()} className={"day" + (day.isToday ? " today" : "") + (day.isCurrentMonth ? "" : " different-month") + (day.date.isSame(this.props.selected) ? " selected" : "")}>
					{day.number}
					<p>Absent:</p>
					<ul>
						{absentStudents}
					</ul>
					<p>Late:</p>
					<ul>
					  {lateStudents}
					</ul>
				</td>
			);
			date = date.clone();
			date.add(1, "d");

		}

		return (
			<tr className="week" key={days[0].toString()}>
				{days}
			</tr>

		)
	}
});

module.exports = AttendanceCalendarWeek;
