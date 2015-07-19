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
var _ = require('underscore');

var ClassroomDashboard = React.createClass({
  getInitialState: function(){
    //set list upon initialstate w/ ClassroomStore.getList
    return {
      list: ClassroomStore.getList(),
      info: ClassroomStore.getInfo(),
      loggedIn: AuthStore.checkAuth(),
      showAttendance: false,
      showResults: false
    }
  },

  componentWillMount: function(){
    if(!AuthStore.checkAuth()){
      this.render = function () {
        return false;
      }
      location.hash = '/login';
    }
  },

  componentDidMount: function(){ 
    ClassroomActions.initQuery(this.props.params.id);
    ClassroomStore.addChangeListener(this._onChange);
    AuthStore.addChangeListener(this._onChange);
  },


  componentWillUnmount: function(){
    ClassroomActions.endQuery();
    ClassroomStore.removeChangeListener(this._onChange);
    AuthStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({
      list: ClassroomStore.getList(),
      info: ClassroomStore.getInfo(),
      loggedIn: AuthStore.checkAuth(),
    });
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
    console.log("studentId: " + studentId + "attendance: " + attendance);
    this.state.list[studentId]['attendance'] = attendance;
  },

  saveAttendance: function(){
    return _.map(this.state.list, function(studentNode, index){
      if(studentNode.attendance){
        ClassroomActions.markAttendance(index, studentNode.attendance);  
      }else{
        ClassroomActions.markAttendance(index, 'Present');  
      }
    });
  },

  render: function(){
    var attendance = this.state.showAttendance;
    var behaviorTypes = this.state.info.behavior;
    var markAttendance = this.markAttendance;
    var studentNodes = _.map(this.state.list, function(studentNode,index){
      return (
        <ClassroomStudent key={index} studentId={index} markAttendance={markAttendance} attendance={attendance} studentTitle={studentNode.studentTitle} behavior={studentNode.behaviorTotal} behaviorActions={behaviorTypes} />
      )
    });
    return (
      <div className="classroomDashboard">
        <Navbar loggedIn = {this.state.loggedIn}/>
        <ClassroomNavbar onAttendanceClick={this.handleAttendance} showTimerOptions={this.showTimerOptions}/>
        <div className="container">
          {this.state.showAttendance ? <AttendanceNavbar saveAttendance={this.saveAttendance} /> : null}
          <div className="row">
            {this.state.showResults ? <TimerBar/> : null}
          </div>
          <div className="row">
          {studentNodes}
            <div className="classroom col-md-3">
              <div className="well">
                <a>Add Student</a>
              </div>
            </div>
           <ClassroomForm />
          </div>
        </div>
      </div>
      
    );
  }
});

module.exports = ClassroomDashboard;
