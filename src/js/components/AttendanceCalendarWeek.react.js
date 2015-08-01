var React = require('react');
var _ = require('underscore');

var AttendanceCalendarWeek = React.createClass({
  render: function() {
    var days = [],
      date = this.props.date,
      month = this.props.month;

    // Iterate through each day of the week
    for (var i = 0; i < 7; i++) {
      var day = {
        number: date.date(),
        month: date.month()+1,
        year: date.year(),
        date: date
      };

      // Iterate through list of students
      // If student is absent on the query date, display the student name in the calendar as a list item
      var list = this.props.list;
      var absentStudents = _.map(list, function(student, index){
        var queryDate = day.month + '-' + day.number + '-' + day.year;
        if(student.attendance && student.attendance[queryDate] && student.attendance[queryDate] === 'Absent'){
          return (
            <li key={index}>{student.studentTitle}</li>
          )
        }
      });

      // Iterate through list of students
      // If student is late on the query date, display the student name in the calendar as a list item
      var lateStudents = _.map(list, function(student, index){
        var queryDate = day.month + '-' + day.number + '-' + day.year;
        if(student.attendance && student.attendance[queryDate] && student.attendance[queryDate] === 'Late'){
          return (
            <li key={index}>{student.studentTitle}</li>
          )
        }
      });

      // Push list of absent and late students for the query date to the days array
      days.push(
        <td key={day.date.toString()}>
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
      // Increment date by one day in order to query late and absent student for the next day
      date.add(1, "d");
    }

    // Return days array showing late and absent students for the week
    return (
      <tr className="week" key={days[0].toString()}>
        {days}
      </tr>

    )
  }
});

module.exports = AttendanceCalendarWeek;
