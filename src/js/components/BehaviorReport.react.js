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
  
  componentDidMount: function(){
    var chart;
    var legend;

    var chartData = [{
        country: "Czech Republic",
        litres: 301.90
    }, {
        country: "Ireland",
        litres: 201.10
    }, {
        country: "Germany",
        litres: 165.80
    }, {
        country: "Australia",
        litres: 139.90
    }, {
        country: "Austria",
        litres: 128.30
    }, {
        country: "UK",
        litres: 99.00
    }, {
        country: "Belgium",
        litres: 60.00
    }];
    console.log("AmCharts",AmCharts);
    AmCharts.ready(function () {
        // PIE CHART
        chart = new AmCharts.AmPieChart();
        chart.dataProvider = chartData;
        chart.titleField = "country";
        chart.valueField = "litres";
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
