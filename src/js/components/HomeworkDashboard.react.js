var React = require('react');
var HomeworkStore = require('../stores/HomeworkStore');
var Navbar = require('./Navbar.react');
var AuthStore = require('../stores/AuthStore');

var HomeworkDashboard = React.createClass({
  getInitialState: function(){
    return {
      loggedIn: AuthStore.checkAuth()
    }
  },
  componentWillMount: function(){

  },
  componentWillUnmount: function(){

  },
  _onChange: function(){

  },
  render: function(){
    return (
      <div className="homeworkDashboard">
        <Navbar loggedIn = {this.state.loggedIn}/>
        <div className="container">
          <p>holla</p>
        </div>
      </div>
    );
  }
});

module.exports = HomeworkDashboard;