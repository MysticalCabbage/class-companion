var React = require('react');
var Navbar = require('./Navbar.react');
var AuthStore = require('../stores/AuthStore');
var ClassroomStore = require('../stores/ClassroomStore');
var BehaviorDashboard = require('./BehaviorReport.react');
var ClassroomActions = require('../actions/ClassroomActions');
var AttendanceCalendar = require('./AttendanceCalendar.react');
var _ = require('underscore');

var ReportsDashboard = React.createClass({
	getInitialState: function(){
	  // Set list upon initialstate w/ ClassroomStore.getList
	  return {
	  	list: ClassroomStore.getList(),
	  	info: ClassroomStore.getInfo(),
	    loggedIn: AuthStore.checkAuth(),
      classInfo: ClassroomStore.getList(),
      showBehaviorDashboard: false,
      showAttendanceCalendar: true
	  }
	},

  // Redirect to home page if user is not logged in
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

  showAttendanceCalendar: function(){
    this.setState({
      showAttendanceCalendar: true,
      showBehaviorDashboard: false
    });
  },

  showBehaviorDashboard: function(){
    this.setState({
      showAttendanceCalendar: false,
      showBehaviorDashboard: true
    });
  },

  render: function(){
    var url = '#/classroomDashboard/' + this.props.params.id;
    return (
      <div className="reportsDashboard">
        <Navbar loggedIn={this.state.loggedIn}/>
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
                    <a onClick={this.showBehaviorDashboard}><i className="fa fa-star"><span> Student Behavior</span></i></a>
                  </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <a onClick={this.showAttendanceCalendar}><i className="fa fa-calendar"><span> Attendance</span></i></a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
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
