var React = require('react');
var _ = require('underscore');
var ClassroomActions = require('../actions/ClassroomActions');
var ClassroomStore = require('../stores/ClassroomStore');
var PieChart = require('react-d3/piechart').PieChart;
var ReportsStudent = require('./ReportsStudent.react');

var BehaviorChart = React.createClass({

  render: function() {
    return (
      <div>Hello from the behavior chart</div>
    );
  }

});

module.exports = BehaviorChart;