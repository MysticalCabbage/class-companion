var React = require('react');
var ClassroomActions = require('../actions/ClassroomActions');
var BehaviorButtons = require('./BehaviorButtons.react');
var ClassroomStore = require('../stores/ClassroomStore');

var ReportsStudent = React.createClass({
  render: function(){
    return (
      <div className="panel-body">
        {this.props.studentTitle}
      </div>
    );
  }
});

module.exports = ReportsStudent;

