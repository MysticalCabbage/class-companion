var React = require('react');

var Navbar = React.createClass({
	render: function() {
		return (
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container">
				  <div className="navbar-header">
				  	<a className="navbar-brand" href="#">Mystical Cabbage</a>
				  </div>
				  <div id="navbar" className="navbar-collapse collapse">
				  	<ul className="nav navbar-nav navbar-right">
				  		<li>
				  			<a href="#">Logout</a>
				  		</li>
				  	</ul>
				  </div>
				</div>
			</nav>
		);
	}

});

module.exports = Navbar;