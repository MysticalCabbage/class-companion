var React = require('react');
var TeacherClass = require('./TeacherClass.react');

var TeacherDashboard = React.createClass({
	render: function() {
		return (
			<div className="teacherDashboard container">
				<div className="row">
					<TeacherClass />
					<TeacherClass />
					<TeacherClass />
					<TeacherClass />
					<TeacherClass />
					<TeacherClass />
				</div>
			</div>
		);
	}

});

module.exports = TeacherDashboard;