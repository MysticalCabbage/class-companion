var React = require('react');
var AuthStore = require('../stores/AuthStore');
var ReportsStudent = require('./ReportsStudent.react');
var AttendanceCalendar = require('./AttendanceCalendar.react');
var ClassroomStore = require('../stores/ClassroomStore');
var ClassroomActions = require('../actions/ClassroomActions');
var Navbar = require('./Navbar.react');
var BehaviorDashboard = require('./BehaviorReport.react');
var _ = require('underscore');

var ReportsDashboard = React.createClass({
	getInitialState: function(){
	  //set list upon initialstate w/ ClassroomStore.getList
	  return {
	  	list: ClassroomStore.getList(),
	  	info: ClassroomStore.getInfo(),
	    loggedIn: AuthStore.checkAuth(),
	    reportType: 'Attendance',
      classInfo: ClassroomStore.getList(),
      showAttendanceCalendar: true,
      showBehaviorDashboard: false
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

  render: function(){
    
    return (
      <div className="reportsDashboard">
        <Navbar loggedIn = {this.state.loggedIn}/>
        <div className="container">
          {this.state.showBehaviorDashboard? 
            <BehaviorDashboard who={this.state.who} />
          : null}
          {this.state.showAttendanceCalendar ? 
    		    <AttendanceCalendar list={this.state.list} />
          : null}
        </div>
      </div>
    );
  }
});

module.exports = ReportsDashboard;
