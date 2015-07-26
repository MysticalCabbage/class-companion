var React = require('react');
var ClassroomStore = require('../stores/ClassroomStore');
var HomeworkForm = require('./HomeworkForm.react');
var HomeworkActions = require('../actions/HomeworkActions');
var HomeworkStore = require('../stores/HomeworkStore');
var Navbar = require('./Navbar.react');
var AuthStore = require('../stores/AuthStore');

var HomeworkDashboard = React.createClass({
  getInitialState: function(){
    return {
      loggedIn: AuthStore.checkAuth(),
      info: ClassroomStore.getInfo(),
      assignments: ClassroomStore.getAssignments()
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

  componentWillMount: function(){ 
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
   
  },

  render: function(){
    return (
      <div className="homeworkDashboard">
        <Navbar loggedIn = {this.state.loggedIn}/>
        <div className="container">
          <HomeworkForm classId={this.props.params.id}/>
        </div>
      </div>
    );
  }
});

module.exports = HomeworkDashboard;
