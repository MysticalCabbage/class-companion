var React = require('react');
var Navbar = require('./Navbar.react');
var TeacherDashboard = require('./TeacherDashboard.react');

var App = React.createClass({
	render: function() {
		return (
			<div className="app">
				<Navbar />
				<TeacherDashboard />
			</div>
		);
	}

});

module.exports = App;