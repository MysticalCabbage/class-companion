var React = require('react');

var App = React.createClass({
	render: function() {
		return (
			<div>
				<h1>Hello world!</h1>
				<p>Stacy</p>
			</div>
		);
	}
	
});
	
React.render(<App />, document.getElementById('app'));