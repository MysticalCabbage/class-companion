var React = require('react');
var ClassroomActions = require('../actions/ClassroomActions');
var BehaviorButtons = require('./BehaviorButtons.react');
var ClassroomStore = require('../stores/ClassroomStore');

var ReportsStudent = React.createClass({
  render: function(){
    return (
    	<div className="panel-body">
    	  <a onClick={this.props.studentClick}>{this.props.studentTitle}</a>
    	</div>
    );
  }
});

module.exports = ReportsStudent;
