var React = require('react');
var Modal = require('react-modal');
var ClassroomStudent = require('./ClassroomStudent.react');
var ClassroomActions = require('../actions/ClassroomActions');
var ClassroomStore = require('../stores/ClassroomStore');
var ClassroomForm = require('./ClassroomForm.react');
var AuthStore = require('../stores/AuthStore');
var Navbar = require('./Navbar.react');
var TimerBar = require('./TimerBar.react.js');
var ClassroomNavbar = require('./ClassroomNavbar.react');
var AttendanceNavbar = require('./AttendanceNavbar.react');
var StudentGroup = require('./StudentGroup.react');
var StudentRandom = require('./StudentRandom.react');
var StudentSelectionStore = require('../stores/StudentSelectionStore');
var _ = require('underscore');

var appElement = document.getElementById('app');
Modal.setAppElement(appElement);
Modal.injectCSS();

var ClassroomDashboard = React.createClass({
  getInitialState: function(){
    //set list upon initialstate w/ ClassroomStore.getList
    return {
      list: ClassroomStore.getList(),
      info: ClassroomStore.getInfo(),
      today: ClassroomStore.getToday(),
      loggedIn: AuthStore.checkAuth(),
      showAttendance: false,
      showResults: false,
      showGroup: false,
      addStudentModalIsOpen: false, 
      randomModal: false
    }
  },

  componentWillMount: function(){
    if(!AuthStore.checkAuth()){
      this.render = function () {
        return false;
      }
      location.hash = '/';
    }
  },

  componentDidMount: function(){ 
    ClassroomActions.initQuery(this.props.params.id);
    ClassroomStore.addChangeListener(this._onChange);
    StudentSelectionStore.addChangeListener(this.openRandomModal);
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    ClassroomActions.endQuery();
    ClassroomActions.endSelectQuery();
    ClassroomStore.removeChangeListener(this._onChange);
    StudentSelectionStore.removeChangeListener(this.openRandomModal);
    AuthStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({
      list: ClassroomStore.getList(),
      info: ClassroomStore.getInfo(),
      loggedIn: AuthStore.checkAuth(),
      today: ClassroomStore.getToday()
    });
  },

  openAddStudentModal: function(){
    this.setState({addStudentModalIsOpen: true});
  },
  
  closeAddStudentModal: function() {
    this.setState({addStudentModalIsOpen: false});
  },

  openRandomModal: function(){
    this.setState({randomModal: true});
  },
  
  closeRandomModal: function() {
    this.setState({randomModal: false});
  },

  handleAttendance: function(){
    this.setState({
      showAttendance: !this.state.showAttendance,
    });
  },

  showTimerOptions: function(){
    this.setState({
      showResults: !this.state.showResults
    });
  },

  markAttendance: function(studentId, attendance){
    if(!this.state.list[studentId].hasOwnProperty(attendance)){
      this.state.list[studentId].attendance = {};
    }
    this.state.list[studentId].attendance[this.state.today] = attendance;
  },

  saveAttendance: function(){
    this.handleAttendance();
    var today = this.state.today;
    return _.map(this.state.list, function(studentNode, index){
      if(studentNode.attendance && studentNode.attendance[today]){
        ClassroomActions.markAttendance(index, studentNode.attendance[today]);
      } else {
        ClassroomActions.markAttendance(index, 'Present');  
      }
    });
  },

  randStudent: function(){
    ClassroomActions.randStudent();
  },

  randGroup: function(){
    if(!this.state.showGroup){
      ClassroomActions.randGroup();
    }
    this.setState({showGroup : !this.state.showGroup});
  },

  render: function(){
    var attendance = this.state.showAttendance;
    var behaviorTypes = this.state.info.behavior;
    var markAttendance = this.markAttendance;
    var today = this.state.today;
    var studentNodes = _.map(this.state.list, function(studentNode,index){
      var status = null;
      if(studentNode.attendance){
        status = studentNode.attendance[today]
      };
      return (
        <ClassroomStudent key={index} studentId={index} markAttendance={markAttendance} attendance={attendance} studentTitle={studentNode.studentTitle} behavior={studentNode.behaviorTotal} behaviorActions={behaviorTypes} status={status}/>
      )
    });
    return (

      <div className="classroomDashboard">
        <Navbar loggedIn = {this.state.loggedIn}/>
        <ClassroomNavbar 
          classId={this.state.info.classId} 
          onAttendanceClick={this.handleAttendance} 
          showTimerOptions={this.showTimerOptions} 
          randStudent={this.randStudent} 
          randGroup={this.randGroup} />
        {this.state.showAttendance ? <AttendanceNavbar saveAttendance={this.saveAttendance} /> : null}
        <div className="container">
          <div className="row">
            {this.state.showResults ? <TimerBar/> : null}
          </div>
          <div className="row">
          {studentNodes}
          <div className="classroom col-md-3">
            <div className="well">
              <a onClick={this.openAddStudentModal}>Add Student</a>
            </div>
          </div>
          <Modal className="classModal" isOpen={this.state.addStudentModalIsOpen} onRequestClose={this.closeAddStudentModal}>
            <ClassroomForm closeAddStudentModal={this.closeAddStudentModal}/>
          </Modal>
          <Modal className="randomModal" isOpen={this.state.randomModal} onRequestClose={this.closeRandomModal}>
            <StudentRandom closeRandomModal={this.closeRandomModal}/>
          </Modal>
            {this.state.showGroup ? <StudentGroup/> : null }
          </div>
        </div>
      </div>
    );
  }
});



module.exports = ClassroomDashboard;
