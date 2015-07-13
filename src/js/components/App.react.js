var React = require('react');
var Navbar = require('./Navbar.react');
var TeacherDashboard = require('./TeacherDashboard.react');

window.classData = [
	{classTitle: 'Math'},
	{classTitle: 'English'},
	{classTitle: 'Science'},
	{classTitle: 'History'},
	{classTitle: 'Biology'},
	{classTitle: 'Chemistry'},
	{classTitle: 'Math'}
];

var App = React.createClass({
	render: function() {
		return (
			<div className="app">
				<Navbar />
				<TeacherDashboard data={window.classData}/>
			</div>
		);
	}

});

module.exports = App;