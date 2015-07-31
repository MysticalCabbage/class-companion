var React = require('react');
var _ = require('underscore');
var ClassroomActions = require('../actions/ClassroomActions');
var ClassroomStore = require('../stores/ClassroomStore');
var PieChart = require('react-d3/piechart').PieChart;
var BarChart = require('react-d3/barchart').BarChart;
var ReactD3Components = require('react-d3-components');
var LineChart = ReactD3Components.LineChart;

var ReportsStudent = require('./ReportsStudent.react');

var d3 = require('d3');
var moment = require('moment');

var BehaviorDashboard = React.createClass({
  getInitialState: function(){
    //set list upon initialstate w/ ClassroomStore.getList
    return {
      list: ClassroomStore.getList(),
      info: ClassroomStore.getInfo(),
      graph: ClassroomStore.getGraph(),
      student: ClassroomStore.getStudent(),
      behaviorHistory: ClassroomStore.getBehaviorHistory(),
    }
  },

  _onChange: function(){
    this.setState({
        graph: ClassroomStore.getGraph(),
        list: ClassroomStore.getList(),
        student: ClassroomStore.getStudent(),
        behaviorHistory: ClassroomStore.getBehaviorHistory()
    });
  },

  componentDidMount: function(){
    ClassroomStore.addChangeListener(this._onChange);    
  },

  componentWillUnmount: function(){
    ClassroomStore.removeChangeListener(this._onChange);
  },

  studentClick: function(studentStats,behaviorTotal, studentTitle, behaviorHistory, studentId){
    var chartData = [];
    var total = 0;
    for(var key in studentStats){
       total += studentStats[key];
    }
    ClassroomActions.getBehaviors(studentStats, total, studentTitle, behaviorHistory, studentId);
  },

  render: function(){
    var behaviorHistoryExists = true;
    if(this.state.student){
      //means no student selected
      var studentState = this.state.student + "'s Behavior";
    } else{
      var studentState = "Student Behavior";
    }
    if(!this.state.graph.pieChart || this.state.graph.pieChart.length === 0){
      var noBehavior = "This student has no behavior points!";
    } else {
      var noBehavior = "";
    }
    // if there is no behavior history
    if (!this.state.behaviorHistory.behaviorData || this.state.behaviorHistory.behaviorData.values.length < 2) {
      // do not show the behavior history bar graph
      behaviorHistoryExists = false;
    } // else the behavior history exists
    else {
      // store the behavior line chart D3 options
      var ticksInterval;
      var numDates = this.state.behaviorHistory.behaviorData.values.length;
      // if there are less than 5 dates
      if (numDates < 5) {
        // assign a tick for every date
        ticksInterval = 1
      } // else if there are more than 5 dates
      else {
        // set the tick intervals to be 5 ticks long
        ticksInterval = Math.ceil(numDates / 4);
      }
      var chartVars = this.state.behaviorHistory.d3ChartVars;
      var xScale = d3.time.scale().domain([chartVars.minDate, chartVars.maxDate]).range([0, 520]);
      var xAxis = {tickValues: xScale.ticks(d3.time.day, ticksInterval), tickFormat: d3.time.format("%m/%d"), label: "date"};
      // var xAxis = {ticks: 10}
      var yScale = d3.scale.linear().domain([chartVars.minSum - 5, chartVars.maxSum + 5]).range([340, 0]);
      var yAxis = {label: "behavior points"};
    }


 
    // TODO: Access the behavior history after I make that property
    var studentClicked = this.studentClick;

    var studentNodes = _.map(this.state.list, function(studentNode,index){
      // if there is no behavior history, set this to an empty object
    var behaviorHistory = studentNode.behaviorHistory || {};
    
   
      return (
        <ReportsStudent key={index} studentId={index} studentTitle={studentNode.studentTitle} studentClick={studentClicked} studentBehavior={studentNode.behavior} behaviorTotal={studentNode.behaviorTotal} behaviorHistory={behaviorHistory}/>
      )
    });
    return (
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
                <h3 className="panel-title">{studentState}</h3>
              </div>
              <div className="panel-body">
                <div>{noBehavior}</div>
                <div className="row">
                  <div className="col-md-6">
                    <PieChart
                      data={this.state.graph.pieChart}
                      width={400}
                      height={400}
                      radius={100}
                      innerRadius={20}/>
                  </div>
                {behaviorHistoryExists ? 
                    <div className="col-md-6">
                      <LineChart
                       data={this.state.behaviorHistory.behaviorData}
                       width={600}
                       height={400}
                       margin={{top: 10, bottom: 50, left: 50, right: 20}}
                       xScale={xScale}
                       xAxis={xAxis}
                       yScale={yScale}
                       yAxis= {yAxis} />
                    </div>
                  : <div />}
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <BarChart
                      data={this.state.graph.barGraph}
                      width={400}
                      height={400}
                      fill={'#3182bd'}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = BehaviorDashboard;

