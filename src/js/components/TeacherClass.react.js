var React = require('react');

var TeacherClass = React.createClass({
	render: function() {
		return (
			<div className="teacherClass col-md-3">
				<div className="well">
					<a href="#">I am a class!</a>
				</div>
			</div>
		);
	}

});

module.exports = TeacherClass;