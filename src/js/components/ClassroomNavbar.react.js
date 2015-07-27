var React = require('react');


var ClassroomNavbar = React.createClass({
  handleAttendance: function(){
    this.props.onAttendanceClick();
  },

  showTimerOptions: function(){
    this.props.showTimerOptions();
  },

  selectRandom: function(){
    this.props.randStudent();
  },

  selectGroup: function(){
    this.props.openGroupModal();
  },

  render: function() {
    var url = '#/reportsDashboard/' + this.props.classId;
    var hwUrl = '#/homeworkDashboard/' + this.props.classId;
    return (
      <nav className="classroomNavbar container navbar navbar-default">
        <div className="container-fluid">
          <div id="navbar" className="navbar-collapse collapsed">
            <ul className="nav navbar-nav">
              <li>
                <a href={'#/teacherDashboard/'}><i className="fa fa-arrow-left"> Back to classes</i></a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href={url}><i className="fa fa-pie-chart"><span> Reports</span></i></a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href={hwUrl}><i className="fa fa-book"> Homework</i></a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a onClick={this.showTimerOptions}><i className="fa fa-clock-o"><span> Timer</span></i></a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a onClick={this.selectRandom}><i className="fa fa-random"><span> Random</span></i></a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a onClick={this.selectGroup}><i className="fa fa-users"><span> Group</span></i></a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a onClick={this.handleAttendance}><i className="fa fa-check-square-o"><span> Attendance</span></i></a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

});

module.exports = ClassroomNavbar;
