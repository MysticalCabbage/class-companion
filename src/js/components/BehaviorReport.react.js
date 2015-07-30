var React = require('react');
var _ = require('underscore');
var ClassroomActions = require('../actions/ClassroomActions');
var ClassroomStore = require('../stores/ClassroomStore');
var PieChart = require('react-d3/piechart').PieChart;
// var LineChart = require('react-d3/linechart').LineChart;
var ReactD3Components = require('react-d3-components');
var LineChart = ReactD3Components.LineChart;
var ReportsStudent = require('./ReportsStudent.react');
var BehaviorHistoryChart = require('./BehaviorHistoryChart.react');
var d3 = require('d3');

var BehaviorDashboard = React.createClass({
  getInitialState: function(){
    //set list upon initialstate w/ ClassroomStore.getList
    return {
      list: ClassroomStore.getList(),
      info: ClassroomStore.getInfo(),
      graph: ClassroomStore.getGraph(),
      student: ClassroomStore.getStudent(),
      behaviorHistory: ClassroomStore.getBehaviorHistory(),
      demoData: {label: '', values: [
                {x: new Date(2015, 2, 5), y: 1},
                {x: new Date(2015, 2, 6), y: 2},
                {x: new Date(2015, 2, 7), y: 0},
                {x: new Date(2015, 2, 8), y: 3},
                {x: new Date(2015, 2, 9), y: 2},
                {x: new Date(2015, 2, 10), y: 3},
                {x: new Date(2015, 2, 11), y: 4},
                {x: new Date(2015, 2, 12), y: 4},
                {x: new Date(2015, 2, 13), y: 1},
                {x: new Date(2015, 2, 14), y: 5},
                {x: new Date(2015, 2, 15), y: 0},
                {x: new Date(2015, 2, 16), y: 1},
                {x: new Date(2015, 2, 16), y: 1},
                {x: new Date(2015, 2, 18), y: 4},
                {x: new Date(2015, 2, 19), y: 4},
                {x: new Date(2015, 2, 20), y: 5},
                {x: new Date(2015, 2, 21), y: 5},
                {x: new Date(2015, 2, 22), y: 5},
                {x: new Date(2015, 2, 23), y: 1},
                {x: new Date(2015, 2, 24), y: 0},
                {x: new Date(2015, 2, 25), y: 1},
                {x: new Date(2015, 2, 26), y: 1}
            ]},
            xScale: d3.time.scale().domain([new Date(2015, 7, 26), new Date(2015, 7, 30)]).range([0, 400]),
            // xScaleBrush: d3.time.scale().domain([new Date(2015, 2, 5), new Date(2015, 2, 26)]).range([0, 400])
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

  studentClick: function(studentStats,behaviorTotal, studentTitle, behaviorHistory){
    var chartData = [];
    var total = 0;
    for(var key in studentStats){
       total += studentStats[key];
    }
    ClassroomActions.getBehaviors(studentStats, total, studentTitle, behaviorHistory);
  },

  render: function(){
    if(this.state.student){
      //means no student selected
      var studentState = this.state.student + "'s Behavior";
    } else{
      var studentState = "Student Behavior";
    }
    if(this.state.graph.length === 0){
      var noBehavior = "This student has no behavior points!";
    } else {
      var noBehavior = "";
    }
    console.log(this.state.behaviorHistory)
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
                  <div className="col-md-12">
                    <PieChart
                      data={this.state.graph}
                      width={400}
                      height={400}
                      radius={100}
                      innerRadius={20}/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <LineChart
                   data={this.state.behaviorHistory}
                   width={400}
                   height={400}
                   margin={{top: 10, bottom: 50, left: 50, right: 20}}
                   xScale={this.state.xScale}
                   xAxis={{tickValues: this.state.xScale.ticks(d3.time.day, 2), tickFormat: d3.time.format("%m/%d")}} />
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

