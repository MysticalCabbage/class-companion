var React = require('react');
var _ = require('underscore');
var ClassroomActions = require('../actions/ClassroomActions');
var ClassroomStore = require('../stores/ClassroomStore');
var PieChart = require('react-d3/piechart').PieChart;
var ReportsStudent = require('./ReportsStudent.react');

var BehaviorDashboard = React.createClass({
  getInitialState: function(){
    //set list upon initialstate w/ ClassroomStore.getList
    return {
      list: ClassroomStore.getList(),
      info: ClassroomStore.getInfo(),
      graph: ClassroomStore.getGraph()
    }
  },

  _onChange: function(){
    this.setState({
        graph: ClassroomStore.getGraph(),
        list: ClassroomStore.getList()
    });
  },

  componentDidMount: function(){
    ClassroomStore.addChangeListener(this._onChange);    
  },

  componentWillUnmount: function(){
    ClassroomStore.removeChangeListener(this._onChange);
  },

  studentClick: function(studentStats,behaviorTotal, studentId){
    var chartData = [];
    var total = 0;
    for(var key in studentStats){
       total += studentStats[key];
    }

    ClassroomActions.getBehaviors(studentStats, total);
  },

  render: function(){
    var studentClicked = this.studentClick;
    var studentNodes = _.map(this.state.list, function(studentNode,index){
      return (
        <ReportsStudent key={index} studentId={index} studentTitle={studentNode.studentTitle} studentClick={studentClicked} studentBehavior={studentNode.behavior} behaviorTotal={studentNode.behaviorTotal}/>
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
                <h3 className="panel-title">Behavior</h3>
              </div>
              <div className="panel-body">
                <PieChart
                  data={this.state.graph}
                  width={400}
                  height={400}
                  radius={100}
                  innerRadius={20}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = BehaviorDashboard;

