var React = require('react');
var HomeworkForm = require('./HomeworkForm.react');
var HomeworkActions = require('../actions/HomeworkActions');
var HomeworkStore = require('../stores/HomeworkStore');
var Navbar = require('./Navbar.react');
var AuthStore = require('../stores/AuthStore');
var _ = require('underscore');

var HomeworkAssignment = React.createClass({
  render: function(){
    return (
      <tr>
          <th>{this.props.title}</th>
          <th>{this.props.dueDate}</th>
          <th><button type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></th>
        </tr>
    );
  }
});

var HomeworkDashboard = React.createClass({
  getInitialState: function(){
    return {
      list: HomeworkStore.getList(),
      assignments: HomeworkStore.getAssignments(),
      homeworkFor: HomeworkStore.getHomeworkFor()
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
    HomeworkActions.initQuery(this.props.params.id);
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
      homeworkFor: HomeworkStore.getHomeworkFor()
    });
  },
  removeHW: function(e){
    // HomeworkActions.removeHW(this.props)
    console.log("clicked", this.props);
  },

  render: function(){
    var remove = this.removeHW;
    var assignments = _.map(this.state.assignments, function(assignment, index){
      console.log("index",index, assignment);
      return (
        <HomeworkAssignment 
          key={index}
          title = {assignment.assignment}
          dueDate = {assignment.dueDate}
          classId = {assignment.classId} />
      );
    });
    return (
      <div className="homeworkDashboard">
        <Navbar loggedIn = {this.state.loggedIn}/>
        <div className="container">
          <table className="table">
            <tr>
              <th><h4>Assignment</h4></th>
              <th><h4>Due Date</h4></th>
              <th></th>
            </tr>
            {assignments}
          </table>
          <HomeworkForm classId={this.props.params.id}/>
        </div>
      </div>
    );
  }
});

module.exports = HomeworkDashboard;
