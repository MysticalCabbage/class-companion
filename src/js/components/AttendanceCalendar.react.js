var React = require('react');
var AttendanceCalendarWeek = require('./AttendanceCalendarWeek.react');
var ClassroomStore = require('../stores/ClassroomStore');
var _ = require('underscore');

var AttendanceCalendar = React.createClass({
  // Set initial moment to 12:00 am today
  getInitialState: function() {
    return {
      month: moment().startOf("day")
    };
  }, 

  // Change state to previous month
  // This will trigger component update to display calendar for the previous month
  previous: function() {
    var month = this.state.month;
    // Moment.js function to mutate the original moment by adding time (usage: moment().add(Number, String))
    month.add(-1, "M");
    this.setState({ month: month });
  },

  // Change state to next month
  // This will trigger component update to display calendar for the next month
  next: function() {
    var month = this.state.month;
    // Moment.js function to mutate the original moment by adding time (usage: moment().add(Number, String))
    month.add(1, "M");
    this.setState({ month: month });
  },

  render: function() {
    return (
      <div className="attendanceCalendar panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Attendance</h3>
        </div>
        <div className="panel-body">
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
    )
  },

  renderWeeks: function() {
    var list = this.props.list;
    // Get the month and date of the Sunday before the first day of this month if the first day does not fall on a Sunday
    var weeks = [],
      done = false,
      date = this.state.month.clone().startOf("month").add("w" -1).day("Sunday"),
      monthIndex = date.month(),
      count = 0;

    while(!done){
      weeks.push(
        <AttendanceCalendarWeek 
          list={list} 
          key={date.toString()} 
          date={date.clone()} 
          month={this.state.month} />
      );
      // Increment date by one week in order to query late and absent student for the next week
      date.add(1, "w");
      done = count++ > 2 && monthIndex !== date.month();
      monthIndex = date.month();
    }

    return weeks;
  },

  // Display label of the current month and year (eg. July, 2015)
  renderMonthLabel: function() {
    return <li><a>{this.state.month.format("MMMM, YYYY")}</a></li>;
  }
});

module.exports = AttendanceCalendar;
