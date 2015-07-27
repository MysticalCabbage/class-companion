var React = require('react');
var ClassroomStore = require('../stores/ClassroomStore');
var HomeworkForm = require('./HomeworkForm.react');
var HomeworkActions = require('../actions/HomeworkActions');
var HomeworkStore = require('../stores/HomeworkStore');
var Navbar = require('./Navbar.react');
var AuthStore = require('../stores/AuthStore');
var _ = require('underscore');

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

  render: function(){
    var assignments = _.map(this.state.assignments, function(assignment){
      return (
        <tr>
          <th>{assignment.assignment}</th>
          <th>{assignment.dueDate}</th>
        </tr>
      );
    });
    return (
      <div className="homeworkDashboard">
        <Navbar loggedIn = {this.state.loggedIn}/>
        <div className="container">
          <table className="table">
            <tr>
              <th>Assignment</th>
              <th>Due Date</th>
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
