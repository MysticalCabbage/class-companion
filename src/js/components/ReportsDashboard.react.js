var React = require('react');
var AuthStore = require('../stores/AuthStore');
var ReportsStudent = require('./ReportsStudent.react');
var AttendanceCalendar = require('./AttendanceCalendar.react');
var ClassroomStore = require('../stores/ClassroomStore');
var ClassroomActions = require('../actions/ClassroomActions');
var Navbar = require('./Navbar.react');
var BehaviorDashboard = require('./BehaviorReport.react');
var _ = require('underscore');
var Router = require('react-router');
var Link = Router.Link;

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
    
    return (
      <div className="reportsDashboard">
        <Navbar loggedIn = {this.state.loggedIn}/>
        <div className="container">
          <nav className="classroomNavbar container navbar navbar-default">
            <div className="container-fluid">
              <div id="navbar" className="navbar-collapse collapsed">
                <ul className="nav navbar-nav">
                  <li>
                    <Link to="/"><i className="fa fa-arrow-left"> Back to classroom</i></Link>
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
