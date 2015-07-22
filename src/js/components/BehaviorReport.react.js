var React = require('react');
var ClassroomStore = require('../stores/ClassroomStore');
var _ = require('underscore');
require('../charts/amcharts');
require('../charts/pie');

var BehaviorDashboard = React.createClass({
  getInitialState: function(){
    //set list upon initialstate w/ ClassroomStore.getList
    return {
      list: ClassroomStore.getList(),
      info: ClassroomStore.getInfo(),
    }
  },

  componentWillMount: function(){
    

    // var tuple = [];
    // for(var key in this.state.list){
    //     var singleStudent = {};
    //     for(var key2 in this.state.list[key].behavior){
    //         singleStudent[key2] = this.state.list[key].behavior[key2]; 
    //     }
    //     tuple.push(singleStudent);
    // }
    // console.log(tuple);
  },
  
  componentDidMount: function(){
    var arrayObj = [];
    for(var key in this.state.info.behavior){
        var obj = {};
        obj[key] = 0;
        arrayObj.push(obj);
    }
    debugger;
    for(var key in this.state.list){
        for(var behaviors in this.state.list[key]["behavior"]){
            // if(arrayObj[behaviors]){
            //     arrayObj[behaviors] += this.state.list[key]["behavior"][behaviors];
            // }
            console.log(this.state.list[key]["behavior"][behaviors]);
            if(arrayObj[behaviors]){
                arrayObj[behaviors] = arrayObj[behaviors] + this.state.list[key]["behavior"][behaviors];
            }
        }
    }
    console.log("b",arrayObj);
    var chart;
    var legend;

    var chartData = [{
        behavior: "badJob",
        value: 12
    }, {
        behavior: "goodJob",
        value: 16
    }, {
        behavior: "helping",
        value: 12
    }, {
        behavior: "bullying",
        value: 4
    }];
    

    AmCharts.ready(function () {
        // PIE CHART
        chart = new AmCharts.AmPieChart();
        chart.dataProvider = chartData;
        chart.titleField = "behavior";
        chart.valueField = "value";
        chart.outlineColor = "#FFFFFF";
        chart.outlineAlpha = 0.8;
        chart.outlineThickness = 2;
        // WRITE
        chart.write("chartdiv");
    });
  },

  render: function(){
    return (
      <div id="chartdiv"></div>
    );
  }
});

module.exports = BehaviorDashboard;
