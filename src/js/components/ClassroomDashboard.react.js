var React = require('react');
var Modal = require('react-modal');
var Navbar = require('./Navbar.react');
var ClassroomTimer = require('./ClassroomTimer.react');
var AuthStore = require('../stores/AuthStore');
var StudentRandom = require('./StudentRandom.react');
var ClassroomForm = require('./ClassroomForm.react');
var ClassroomStore = require('../stores/ClassroomStore');
var ClassroomNavbar = require('./ClassroomNavbar.react');
var ClassroomStudent = require('./ClassroomStudent.react');
var AttendanceNavbar = require('./AttendanceNavbar.react');
var StudentGroupForm = require('./StudentGroupForm.react');
var ClassroomActions = require('../actions/ClassroomActions');
var StudentSelectionStore = require('../stores/StudentSelectionStore');
var _ = require('underscore');

var appElement = document.getElementById('app');
Modal.setAppElement(appElement);
Modal.injectCSS();

// used for clearing random modal setTimeout
var randomModalTimer;

var ClassroomDashboard = React.createClass({
  getInitialState: function(){
    //set list upon initialstate w/ ClassroomStore.getList
    return {
      list: ClassroomStore.getList(),
      info: ClassroomStore.getInfo(),
      groups: StudentSelectionStore.getGroup(),
      today: ClassroomStore.getToday(),
      loggedIn: AuthStore.checkAuth(),
      showAttendance: false,
      showResults: false,
      addStudentModalIsOpen: false, 
      groupModal: false,
      randomModal: false,
      showBehavior: true,
      timerModal: false
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
      today: ClassroomStore.getToday(),
      groups: StudentSelectionStore.getGroup()
    });
  },

  openAddStudentModal: function(){
    this.setState({addStudentModalIsOpen: true});
  },
  
  closeAddStudentModal: function() {
    this.setState({addStudentModalIsOpen: false});
  },

  openRandomModal: function(){
    // if modal already open, restart setTimeout
    // if not opened, open and setTimeout
    if(this.state.randomModal){
      clearTimeout(randomModalTimer);
      randomModalTimer = setTimeout(function(){
        this.closeRandomModal();
      }.bind(this), 3000);
    } else {
      this.setState({randomModal: true});
      randomModalTimer = setTimeout(function(){
        this.closeRandomModal();
      }.bind(this), 3000);
    }
    
  },
  
  closeRandomModal: function() {
    clearTimeout(randomModalTimer);
    this.setState({randomModal: false});
  },

  openGroupModal: function(){
    this.setState({groupModal: true});
  },

  closeGroupModal: function() {
    this.setState({groupModal: false});
  },

  openTimerModal: function(){
    this.setState({timerModal: true});
  },

  closeTimerModal: function() {
    this.setState({timerModal: false});
  },

  handleAttendance: function(){
    this.setState({
      showAttendance: !this.state.showAttendance,
      showBehavior: !this.state.showBehavior
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

  // returns pokemon data object for the view to render
  makePokemonDirectory: function(studentNode) {
    var pokemonDirectory;
    // if the student node already has a pokemon data object
    if (studentNode.pokemon) {
      // store the current pokemon data in the pokemon directory object
      pokemonDirectory = studentNode.pokemon
    } // else if the student node does not have a pokemon directory object
    else {
      /*
        create a dummy object with empty strings so the view can load without error
        NOTE: this is necessary because after we create a student, we need
        to wait for the async call to return and update the student data on the server
        NOTE: If the console shows a "cannot read property X of undefined" in the ClassroomStudent view,
        it is likely because this needs an empty string in the corresponding property 
      */
      pokemonDirectory = {
        _pokemonData: {name: ''}, 
        _spriteUrl: '',
        profile: {currentExp: '', level: '', expToNextLevel: ''},
        hasAPokemon: false,
      }
    }
    return pokemonDirectory;
  },

  render: function(){
    var attendance = this.state.showAttendance;
    var showBehavior = this.state.showBehavior;
    var behaviorTypes = this.state.info.behavior;
    var markAttendance = this.markAttendance;
    var today = this.state.today;
    var list = this.state.list;
    var context = this;

    var studentGroups = [];
    var studentCount = Object.keys(list).length
    var groupCount = Object.keys(this.state.groups).length
    var groupSize = 0;
    // prevent error during initial mounting
    // list and group are empty objects when component mounts
    if(groupCount > 0 && studentCount > 0 ){
      groupList = this.state.groups;
    } else {
      groupList = {};
    }

    groupSize = _.reduce(groupList, function(max, cur){
      return Math.max(max, cur)
    }, 0);

    var isGrouped = (groupSize === 0 || groupSize === 1 || groupCount === groupSize) ? false : true;

    // iterate over list of students in the order of this.state.groups
    _.each(groupList, function(group, studentId){
      var studentNode = list[studentId];
      var status = studentNode.attendance ? studentNode.attendance[today] : null;
      var pokemonDirectory = context.makePokemonDirectory(studentNode);

      if(!studentGroups[group]){
        studentGroups[group] = [];
      }

      studentGroups[group].push((
        <ClassroomStudent 
          key={studentId} 
          studentId={studentId} 
          markAttendance={markAttendance} 
          attendance={attendance} 
          studentTitle={studentNode.studentTitle} 
          behavior={studentNode.behaviorTotal} 
          behaviorActions={behaviorTypes} 
          status={status}
          showBehavior={showBehavior}
          pokemon={pokemonDirectory} 
          groupNum={group}
          isGrouped={isGrouped} />
      ));

    });

    var studentNodes = _.flatten(studentGroups, true);
    // remove index 0 because no group No. 0 
    studentNodes.shift();

    return (
      <div className="classroomDashboard">
        <Navbar loggedIn = {this.state.loggedIn}/>
        <ClassroomNavbar 
          classId={this.state.info.classId} 
          onAttendanceClick={this.handleAttendance} 
          openTimerModal={this.openTimerModal} 
          randStudent={this.randStudent} 
          openGroupModal={this.openGroupModal} />
        {this.state.showAttendance ? <AttendanceNavbar saveAttendance={this.saveAttendance} /> : null}
        <div className="studentsContainer container">
          <Modal className="timerModal"
            isOpen={this.state.timerModal} 
            onRequestClose={this.closeTimerModal}>
            <ClassroomTimer initialTimeRemaining={0} closeTimerModal={this.closeTimerModal} />
          </Modal>
          <div className="row">
            {studentNodes}
            <div className="classroom col-md-3">
              <div className="well">
                <a onClick={this.openAddStudentModal}>+ Add Student</a>
              </div>
            </div>
          </div>
          <Modal className="classModal" 
            isOpen={this.state.addStudentModalIsOpen} 
            onRequestClose={this.closeAddStudentModal}>
            <ClassroomForm closeAddStudentModal={this.closeAddStudentModal}/>
          </Modal>
          <Modal className="randomModal" 
            isOpen={this.state.randomModal} 
            onRequestClose={this.closeRandomModal}>
            <StudentRandom closeRandomModal={this.closeRandomModal}/>
          </Modal>
          <Modal className="groupModal" 
            isOpen={this.state.groupModal} 
            onRequestClose={this.closeGroupModal}>
            <StudentGroupForm closeModal={this.closeGroupModal}/>
          </Modal>
        </div>
      </div>
    );
  }
});

module.exports = ClassroomDashboard;
