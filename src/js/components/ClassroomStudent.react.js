var React = require('react');
var ClassroomActions = require('../actions/ClassroomActions');

var ClassroomStudent = React.createClass({
  getInitialState: function(){
    return null;
  },

  removeStudent: function(){
    ClassroomActions.removeStudent(this.props.studentId);
  },

  addPoint: function(){
    ClassroomActions.addPoint(this.props.studentId, this.props.behavior);
  },

  subtractPoint: function(){
    ClassroomActions.subtractPoint(this.props.studentId, this.props.behavior);
  },

  markAttendance: function(attendance){
    ClassroomActions.markAttendance(this.props.studentId, attendance);
  },

  render: function(){
    return (
      <div className="classroomStudent col-md-3">
        <div className="well">
          <div className="row">
            <div className="col-md-4 col-md-offset-4">
              <button type="button" className="close" aria-label="Close" onClick={this.removeStudent}><span aria-hidden="true">&times;</span></button>
            </div>
          </div>
          { this.props.attendance ? 
            <div className="btn-group" role="group" aria-label="attendanceButtonBar">
              <button type="button" onClick={this.markAttendance.bind(this, 'Present')} className="btn btn-success">Present</button>
              <button type="button" onClick={this.markAttendance.bind(this, 'Late')} className="btn btn-warning">Late</button>
              <button type="button" onClick={this.markAttendance.bind(this, 'Absent')} className="btn btn-danger">Absent</button>
            </div>
          : null }
          <div className="row">
            <span className="label label-default">{this.props.behavior}</span>
          </div>  
          <div className="row">
            <div>{this.props.studentTitle}</div>
          </div>
          <div className="row">
            <button type="button" onClick={this.addPoint} className="btn btn-success">+</button>
            <button type="button" onClick={this.subtractPoint} className="btn btn-danger">-</button>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ClassroomStudent;
