var React = require('react');
var _ = require('underscore');
var ClassroomActions = require('../actions/ClassroomActions');
var ClassroomStore = require('../stores/ClassroomStore');
var ReportsStudent = require('./ReportsStudent.react');
var d3 = require('d3');

var Chart = React.createClass({
  render: function() {
    return (
      <svg width={this.props.width} height={this.props.height}>{this.props.children}</svg>
    );
  }
});

var Line = React.createClass({
  getDefaultProps: function() {
    return {
      path: '',
      color: 'green',
      width: '2',
    }
  }, 

  render: function() {
    return (
      <path d={this.props.pathData} stroke={this.props.color} strokeWidth={this.props.width} fill="none" />
    )
  }
});

var DataSeries = React.createClass({
  detDefaultProps: function() {
    return {
      title: '',
      data: [],
      interpolate: 'linear',
    }
  },

  render: function() {
    var context = this;
    var xScale = this.props.xScale;
    var yScale = this.props.yScale;

    var path = d3.svg.line()
      .x(function(d) { return xScale(d.x); })
      .y(function(d) { return yScale(d.y); })
      .interpolate(this.props.interpolate)

    return (
      <Line path={path(this.props.data)} color={this.props.color} />
    )
  }
});


var BehaviorHistoryChart = React.createClass({
  getDefaultProps: function() {
    return {
      width: 600,
      height: 300,
    }
  },


  render: function() {
    var data = this.props.data;
    var size = { width: this.props.width, height: this.props.height};

    var maxHeight;

    console.log('student data props', this.props.studentData)
    return (
      <div>Hello from the behavior chart</div>
    );
  },

});

module.exports = BehaviorHistoryChart;