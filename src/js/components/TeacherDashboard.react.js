var React = require('react');
var TeacherClass = require('./TeacherClass.react');

var TeacherDashboard = React.createClass({
	render: function() {
		return (
			<div>
				<h1>I am Teacher view</h1>
				<TeacherClass />
			</div>
		);
	}

});

module.exports = TeacherDashboard;