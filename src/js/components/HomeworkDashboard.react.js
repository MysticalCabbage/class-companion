var React = require('react');
var HomeworkForm = require('./HomeworkForm.react');
var HomeworkActions = require('../actions/HomeworkActions');
var HomeworkStore = require('../stores/HomeworkStore');
var Navbar = require('./Navbar.react');
var AuthStore = require('../stores/AuthStore');
var _ = require('underscore');

var HomeworkAssignment = React.createClass({
  getInitialState: function(){
    return null
  },
  removeHW: function(){
    HomeworkActions.removeAssignment(this.props.hwId)
  },
  render: function(){
    return (
      <tr>
          <th> {this.props.title}</th>
          <th>{this.props.dueDate}</th>
          <th>{this.props.assignedOn}</th>
          <th><button type="button" className="close" aria-label="Close" onClick={this.removeHW}><span aria-hidden="true">&times;</span></button></th>
        </tr>
    );
  }
});

var PastAssignments = React.createClass({
  getInitialState: function(){
    return null
  },
  render: function(){
    return null
  }

});

var HomeworkDashboard = React.createClass({
  getInitialState: function(){
    return {
      loggedIn: AuthStore.checkAuth(),
      list: HomeworkStore.getList(),
      assignments: HomeworkStore.getAssignments(),
      homeworkFor: HomeworkStore.getHomeworkFor(),
      showPastAssignments: false,
      showCurrentAssignments: true
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
    var authData = AuthStore.checkAuth();
    if(authData){
      HomeworkActions.initQuery(this.props.params.id);
    }
    HomeworkStore.addChangeListener(this._onChange);
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    HomeworkActions.endQuery();
    HomeworkStore.removeChangeListener(this._onChange);
    AuthStore.removeChangeListener(this._onChange);
  },

    _onChange: function(){
    this.setState({
      list: HomeworkStore.getList(),
      assignments: HomeworkStore.getAssignments(),
      homeworkFor: HomeworkStore.getHomeworkFor(),
      loggedIn: AuthStore.checkAuth()
    });
  },

  showPastAssignments: function(){
    this.setState({
      showPastAssignments: true,
      showCurrentAssignments: false
    });
  },

  render: function(){
    var url = '#/classroomDashboard/' + this.props.classId;
    var remove = this.removeHW;
    var assignments = _.map(this.state.assignments, function(assignment, index){
      console.log("index",index, assignment);
      return (
        <HomeworkAssignment 
          hwId={index}
          key={index}
          title = {assignment.assignment}
          dueDate = {assignment.dueDate}
          classId = {assignment.classId} 
          assignedOn = {assignment.assignedOn}/>
      );
    });
    return (
      <div className="homeworkDashboard">
        <Navbar loggedIn = {this.state.loggedIn}/>
        <div className="container">
        <nav className="classroomNavbar container navbar navbar-default">
            <div className="container-fluid">
              <div id="navbar" className="navbar-collapse collapsed">
                <ul className="nav navbar-nav">
                  <li>
                    <a href={url}><i className="fa fa-arrow-left"> Back to classroom</i></a>
                  </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <a onClick={this.showPastAssignments}><i className="fa fa-archive"><span> View Past Assignments</span></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <table className="table" id="homeworktable">
            <thead>
            <tr>
              <th><h4>Assignment</h4></th>
              <th><h4>Due Date</h4></th>
              <th><h4>Assigned On</h4></th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {this.state.showCurrentAssignments ? {assignments} : null}
            </tbody>
          </table>
          <HomeworkForm classId={this.props.params.id}/>

        </div>
      </div>
    );
  }
});

module.exports = HomeworkDashboard;
