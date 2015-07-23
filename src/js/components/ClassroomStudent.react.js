var React = require('react');
var ClassroomActions = require('../actions/ClassroomActions');
var BehaviorButtons = require('./BehaviorButtons.react');
var ClassroomStore = require('../stores/ClassroomStore');

var ClassroomStudent = React.createClass({
  getInitialState: function(){
    return {
      toggle: this.props.status || 'Present'
    }
  },

  removeStudent: function(){
    ClassroomActions.removeStudent(this.props.studentId);
  },

  markAttendance: function(attendance){
    this.props.markAttendance(this.props.studentId, attendance);
    var toggleState = this.state.toggle;
    if(toggleState === 'Present'){
      toggleState = 'Late';
    }else if(toggleState === 'Late'){
      toggleState = 'Absent';
    }else{
      toggleState = 'Present';
    }

    this.setState({
      toggle: toggleState
    });
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
            { this.state.toggle === 'Present' ? 
            <button type="button" onClick={this.markAttendance.bind(this, 'Late')} className="btn btn-success">Present</button>
            : null }
            { this.state.toggle === 'Late' ? 
            <button type="button" onClick={this.markAttendance.bind(this, 'Absent')} className="btn btn-warning">Late</button>
            : null }
            { this.state.toggle === 'Absent' ? 
            <button type="button" onClick={this.markAttendance.bind(this, 'Present')} className="btn btn-danger">Absent</button>
            : null }
          </div>
        : null }
          <div className="row">
            <span className="label label-default">{this.props.behavior}</span>
          </div>  
          <div className="row">
            <div>{this.props.studentTitle}</div>
          </div>
          <div className="row">
            <BehaviorButtons studentId={this.props.studentId} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ClassroomStudent;
