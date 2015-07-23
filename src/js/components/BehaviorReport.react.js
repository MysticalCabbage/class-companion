var React = require('react');
var ClassroomStore = require('../stores/ClassroomStore');
var _ = require('underscore');
// require('../charts/amcharts');
// require('../charts/pie');
var PieChart = require('react-d3/piechart').PieChart;


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
        graph: ClassroomStore.getGraph()
    });
  },

  componentWillMount: function(){
    console.log("in behaviorreport",this.state.graph);
  },
  
  componentDidMount: function(){
    ClassroomStore.addChangeListener(this._onChange);    
  },

  componentWillUnmount: function(){
    ClassroomStore.removeChangeListener(this._onChange);
  },

  componentDidUpdate: function(){
  },

  componentWillReceiveProps: function(){
  },

  render: function(){
    var chartData = this.state.graph;

    var pieData = [
  {label: 'bullying', value: 20},
  {label: 'goodJob', value: 55},
  {label: 'badJob', value: 25 }
];

    // var pieData = [x];
    return (
          <PieChart
      data={pieData}
      width={400}
      height={400}
      radius={100}
      innerRadius={20}/>
    );
  }
});

module.exports = BehaviorDashboard;
