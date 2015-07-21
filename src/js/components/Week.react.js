var React = require('react');

var Week = React.createClass({
	render: function() {
		var days = [],
			date = this.props.date,
			month = this.props.month;

		for (var i = 0; i < 7; i++) {
			var day = {
				name: date.format("dd").substring(0, 1),
				number: date.date(),
				isCurrentMonth: date.month() === month.month(),
				isToday: date.isSame(new Date(), "day"),
				date: date
			};
			days.push(<td key={day.date.toString()} className={"day" + (day.isToday ? " today" : "") + (day.isCurrentMonth ? "" : " different-month") + (day.date.isSame(this.props.selected) ? " selected" : "")}>{day.number}</td>);
			date = date.clone();
			date.add(1, "d");

		}

		return (
			<tr className="week" key={days[0].toString()}>
				{days}
			</tr>

		)
	}
});

module.exports = Week;
