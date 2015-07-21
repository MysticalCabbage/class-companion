var React = require('react');

var DayNames = React.createClass({
	render: function() {
		return <div className="week names">
			<span className="day">Sun</span>
			<span className="day">Mon</span>
			<span className="day">Tue</span>
			<span className="day">Wed</span>
			<span className="day">Thu</span>
		   	<span className="day">Fri</span>
		   	<span className="day">Sat</span>
		</div>;
	}
});

module.exports = DayNames;
