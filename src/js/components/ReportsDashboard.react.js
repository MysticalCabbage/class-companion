var React = require('react');
var AuthStore = require('../stores/AuthStore');
var ReportsStudent = require('./ReportsStudent.react');
var Calendar = require('./Calendar.react');
var AttendanceStore = require('../stores/AttendanceStore');
var AttendanceActions = require('../actions/AttendanceActions');
var Navbar = require('./Navbar.react');
var _ = require('underscore');

var ReportsDashboard = React.createClass({
	getInitialState: function(){
	  //set list upon initialstate w/ ClassroomStore.getList
	  return {
	  	list: AttendanceStore.getList(),
	  	info: AttendanceStore.getInfo(),
	    loggedIn: AuthStore.checkAuth(),
	    reportType: 'Attendance'
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
    AttendanceActions.initQuery(this.props.params.id);
    AttendanceStore.addChangeListener(this._onChange);
    AuthStore.addChangeListener(this._onChange);
  },


  componentWillUnmount: function(){
    AttendanceActions.endQuery();
    AttendanceStore.removeChangeListener(this._onChange);
    AuthStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({
      list: AttendanceStore.getList(),
      info: AttendanceStore.getInfo(),
      loggedIn: AuthStore.checkAuth(),
    });
  },

  render: function(){
  	var studentNodes = _.map(this.state.list, function(studentNode,index){
  	  return (
  	  	<ReportsStudent key={index} studentId={index} studentTitle={studentNode.studentTitle} />
  	  )
  	});
    return (
      <div className="reportsDashboard">
        <Navbar loggedIn = {this.state.loggedIn}/>
        <div className="container">
          <div className="row">
          	<div className="col-md-2">
          		<div className="panel panel-primary">
          		  <div className="panel-heading">
          		    <h3 className="panel-title">Students</h3>
          		  </div>
          		  {studentNodes}
          		</div>
          	</div>
          	<div className="col-md-10">
          		<div className="panel panel-primary">
          		  <div className="panel-heading">
          		    <h3 className="panel-title">{this.state.reportType}</h3>
          		  </div>
          		  <div className="panel-body">
          		    <Calendar list={this.state.list} />
          		  </div>
          		</div>
          	</div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = ReportsDashboard;
