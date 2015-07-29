var React = require('react');
var Timer = require('./ClassroomTimer.react.js');

var TimerBar = React.createClass({
  getInitialState: function() {
    return {
      showTimer: false,
      totalTime: undefined 
    };
  },

  render: function() {
    return (
      <div className='timeBar'>
        <Timer initialTimeRemaining={this.state.totalTime}/>
      </div>
    
    );
  }
});

module.exports = TimerBar;
