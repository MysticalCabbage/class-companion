var React = require('react');
var ClassroomStore = require('../stores/ClassroomStore');
var StudentSelectionStore = require('../stores/StudentSelectionStore');

var StudentRandom = React.createClass({
  getInitialState: function(){
    return {
      random: ClassroomStore.getList()[StudentSelectionStore.getRandom()]
    }
  },

  componentDidMount: function(){
    StudentSelectionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    StudentSelectionStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({random: ClassroomStore.getList()[StudentSelectionStore.getRandom()]})
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
            <div className="col-md-6">
              {this.state.random ? <img src={this.state.random.pokemon._spriteUrl} /> : null}
            </div>
            <div className="col-md-6 randomStudentTitle">
              {this.state.random ? this.state.random.studentTitle : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = StudentRandom;

