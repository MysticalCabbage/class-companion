var React = require('react');
var ClassroomStore = require('../stores/ClassroomStore');
var StudentSelectionStore = require('../stores/StudentSelectionStore');

var StudentRandom = React.createClass({
  getInitialState: function(){
    return {
      random: ClassroomStore.getList()[StudentSelectionStore.getRandom()]
    }
  },
  render: function(){
    return (
      <div className="panel panel-info StudentRandom">
        <div className="panel-heading">
          <button type="button" className="close" aria-label="Close" onClick={this.props.closeRandomModal}><span aria-hidden="true">&times;</span></button>
          <h3 className="panel-title">Selected Student</h3>
        </div>
        <div className="panel-body">
          <div className="row">
            {this.state.random ? this.state.random.studentTitle : null}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = StudentRandom;

