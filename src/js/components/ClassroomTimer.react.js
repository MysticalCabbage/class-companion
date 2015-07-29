var React = require('react');

var Timer = React.createClass({
  propTypes: {
    initialTimeRemaining: React.PropTypes.number.isRequired,
    interval: React.PropTypes.number,
    formatFunc: React.PropTypes.func,
    tickCallback: React.PropTypes.func,
    completeCallback: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      interval: 1000,
      formatFunc: undefined,
      tickCallback: undefined,
      completeCallback: undefined,
    };
  },

  getInitialState: function() {
    return {
      timeoutId: undefined,
      prevTime: undefined,
      showResults: false,
      timeRemaining: 0
    };
  },

  componentWillReceiveProps: function(newProps, oldProps) {
    if (this.state.timeoutId) clearTimeout(this.state.timeoutId);
    this.setState({ prevTime: undefined, timeRemaining: newProps.initialTimeRemaining });
  },

  componentDidMount: function() {
    this.tick();
  },

  componentDidUpdate: function(){
    if ((!this.state.prevTime) && this.state.timeRemaining >= 0 && this.isMounted()) {
      this.tick();
    }
  },

  componentWillUnmount: function() {
    clearTimeout(this.state.timeoutId);
  },

  handleClick: function(){
    this.setState({showResults: !this.state.showResults});
  },

  tick: function() {
    var currentTime = Date.now();
    var dt = currentTime - this.state.prevTime || 0;
    var interval = this.props.interval;

    var timeRemainingInInterval = (interval - (dt % interval));
    var timeout = timeRemainingInInterval;

    if (timeRemainingInInterval < (interval / 2.0)){
      timeout += interval;
    }

    var timeRemaining = Math.max(this.state.timeRemaining - dt, 0);
    var countdownComplete = (this.state.prevTime && timeRemaining <= 0);

    if (this.isMounted()){
      if (this.state.timeoutId) clearTimeout(this.state.timeoutId);
      this.setState({
        timeoutId: setTimeout(this.tick, timeout),
        prevTime: currentTime,
        timeRemaining: timeRemaining
      });
    }

    if (countdownComplete) {
      if (this.props.completeCallback) { this.props.completeCallback() };
      return;
    }

    if (this.props.tickCallback) {
      this.props.tickCallback(timeRemaining);
    }
  },


  getFormattedTime: function(milliseconds) {
    if (this.props.formatFunc) {
      return this.props.formatFunc(milliseconds);
    }
    var time = {};
    var totalSeconds = Math.round(milliseconds / 1000);
    var seconds = parseInt(totalSeconds % 60);
    var minutes = parseInt(totalSeconds / 60) % 60;
    var hours = parseInt(totalSeconds / 3600);
    time.seconds = seconds < 10 ? '0' + seconds : seconds;
    time.minutes = minutes < 10 ? '0' + minutes : minutes;
    time.hours = hours < 10 ? '0' + hours : hours;
    // return hours + ':' + minutes + ':' + seconds;
    return time;
  },

  customTime: function(){
    var time = React.findDOMNode(this.refs.customTime).value * 60000;
    this.setState({timeRemaining: time });
    time.value = '';
  },

  render: function() {
    var timeRemaining = this.state.timeRemaining;

    return (
      <div className='timer timerContainer'>
        <div className="btn-group" role="group">
          <form onSubmit={this.customTime}>
          <input type="text" className="btn btn-default" placeholder="Enter Minutes" ref="customTime" />
          </form>
        </div>
        <div className="timerTimer">
          <div className="timerHour">
            {this.getFormattedTime(timeRemaining).hours}
          </div>
          <div className="timerMinute">
            {this.getFormattedTime(timeRemaining).minutes}
          </div>
          <div className="timerSecond">
            {this.getFormattedTime(timeRemaining).seconds}
          </div>
        </div>
        <div className="timerLabelContainer">
          <div className="timerHour timerLabel">
            HOURS
          </div>
          <div className="timerMinute timerLabel">
            MINUTES
          </div>
          <div className="timerSecond timerLabel">
            SECONDS
          </div>
        </div>
        <div className="timerButtonContainer">
          <button className="startBtn" onClick={this.customTime}>Start</button>
          <button className="resetBtn">Reset</button>
        </div>
      </div>
    );
  }
});

module.exports = Timer;
