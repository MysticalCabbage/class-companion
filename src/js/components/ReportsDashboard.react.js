var React = require('react');
var AuthStore = require('../stores/AuthStore');
var ReportsStudent = require('./ReportsStudent.react');
var Calendar = require('./Calendar.react');
var ClassroomStore = require('../stores/ClassroomStore');
var ClassroomActions = require('../actions/ClassroomActions');
var Navbar = require('./Navbar.react');
require('../charts/amcharts');
require('../charts/pie');
var BehaviorDashboard = require('./BehaviorReport.react');
var _ = require('underscore');
var ClassroomStore = require('../stores/ClassroomStore');
var ClassroomActions = require('../actions/ClassroomActions');


var ReportsDashboard = React.createClass({
	getInitialState: function(){
	  //set list upon initialstate w/ ClassroomStore.getList
	  return {
	  	list: ClassroomStore.getList(),
	  	info: ClassroomStore.getInfo(),
	    loggedIn: AuthStore.checkAuth(),
	    reportType: 'Attendance',
      classInfo: ClassroomStore.getList()

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

  studentClick: function(studentStats,behaviorTotal, studentId){
    var chartData = [];
    var total = 0;
    for(var key in studentStats){
       total += studentStats[key];
    }
    // this.setState({
    //   who : chartData
    // });
    ClassroomActions.getBehaviors(studentStats, total);
  },

  render: function(){
    console.log("sdflkjsd", this.state.studentInfo);
    var studentClicked = this.studentClick;

  	var studentNodes = _.map(this.state.list, function(studentNode,index){
  	  return (
  	  	<ReportsStudent key={index} studentId={index} studentTitle={studentNode.studentTitle} studentClick={studentClicked} studentBehavior={studentNode.behavior} behaviorTotal={studentNode.behaviorTotal}/>
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
                <div id="studentgraph"></div>
                  <BehaviorDashboard who={this.state.who}/>
                  <Calendar/>
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
