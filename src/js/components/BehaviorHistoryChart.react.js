var React = require('react');
var _ = require('underscore');
var ClassroomActions = require('../actions/ClassroomActions');
var ClassroomStore = require('../stores/ClassroomStore');
var ReportsStudent = require('./ReportsStudent.react');
var d3 = require('d3');

var BehaviorChart = React.createClass({



  render: function() {
    console.log('student data props', this.props.studentData)
    return (
      <div>Hello from the behavior chart</div>
    );
  },

});

module.exports = BehaviorChart;