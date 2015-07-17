var React = require('react');
var Timer = require('./ClassroomTimer.react.js');
var TimerBar = React.createClass({
  getInitialState: function() {
    return {
      showTimer: false,
      totalTime: undefined
    };
  },
  showTimer: function(x){
    var timeSeconds = x * 60000;
    this.setState({showTimer: !this.state.showTimer, totalTime: timeSeconds });
  },
  render: function() {
    return (
      <div className='row'>
        <div className="timer col-md-7">
        <div className="btn-group btn-group-justified" role="group" aria-label="...">
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-default" onClick={this.showTimer.bind(null,5)}>5 Minutes</button>
        </div>
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-default" onClick={this.showTimer.bind(null,10)}>10 Minutes</button>
        </div>
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-default">custom time</button>
        </div>
        </div>
      </div>
        <div className="timer col-md-3">
          <h4>{this.state.showTimer ? <Timer initialTimeRemaining={this.state.totalTime}/> : null}</h4>
        </div>
      </div>
    
    );
  }
});

module.exports = TimerBar;
