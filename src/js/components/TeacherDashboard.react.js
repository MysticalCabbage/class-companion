var React = require('react');
var TeacherClass = require('./TeacherClass.react');


var TeacherDashboard = React.createClass({
	render: function() {
		var classNodes = this.props.data.map(function(classNode, index){
			return (
				<TeacherClass key={index} classTitle={classNode.classTitle}/>
			)
		})

		return (
			<div className="teacherDashboard container">
				<div className="row">
					{classNodes}
					<TeacherClass classTitle="Add Class +"/>
				</div>
			</div>
		);
	}

});

module.exports = TeacherDashboard;