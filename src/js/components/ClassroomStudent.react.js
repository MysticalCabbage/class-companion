var React = require('react');
var ClassroomActions = require('../actions/ClassroomActions');
var BehaviorButtons = require('./BehaviorButtons.react');
var ClassroomStore = require('../stores/ClassroomStore');
var Modal = require('react-modal');

var appElement = document.getElementById('app');
Modal.setAppElement(appElement);
Modal.injectCSS();

var ClassroomStudent = React.createClass({
  getInitialState: function(){
    return {
      toggle: this.props.status || 'Present',
      behaviorModalIsOpen: false 
    }
  },

  removeStudent: function(){
    ClassroomActions.removeStudent(this.props.studentId);
  },

  openBehaviorModal: function(){
    this.setState({behaviorModalIsOpen: true});
  },
  
  closeBehaviorModal: function() {
    this.setState({behaviorModalIsOpen: false});
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
      <div className="col-md-3" >
          { this.props.attendance ? 
          <div className="attendanceButton btn-group" role="group" aria-label="attendanceButtonBar">
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
        {this.props.showBehavior ? 
        <div className="image">
          <img className="behaviorImg" src="./assets/behaviorStar.png" alt="" />
          <p className="behaviorPoints">{this.props.behavior}</p>
        </div>
        : null}
        <div className="well classroomStudent" onClick={this.openBehaviorModal}>
          <div>
            <button type="button" className="close" aria-label="Close" onClick={this.removeStudent}><span aria-hidden="true">&times;</span></button>
          </div>
          <div>
            <div>{this.props.studentTitle}</div>
          </div>
          <Modal className="behaviorModal" isOpen={this.state.behaviorModalIsOpen} onRequestClose={this.closeBehaviorModal}>
            <BehaviorButtons studentId={this.props.studentId} studentTitle={this.props.studentTitle} closeBehaviorModal={this.closeBehaviorModal} />
          </Modal>
        </div>
      </div>
    );
  }
});

module.exports = ClassroomStudent;
