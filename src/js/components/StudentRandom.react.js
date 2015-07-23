var React = require('react');
var StudentSelectionStore = require('../stores/StudentSelectionStore');

var StudentRandom = React.createClass({
  getInitialState: function(){
    return {
      random: StudentSelectionStore.getRandom()
    }
  },

  componentDidMount: function(){ 
    StudentSelectionStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    StudentSelectionStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({
      random: StudentSelectionStore.getRandom()
    });
  },

  closeModal: function(){
    console.log('close');
  },
  render: function(){
    return (
      <div className="panel panel-info StudentRandom">
        <div className="panel-heading">
          <button type="button" className="close" aria-label="Close" onClick={this.closeModal}><span aria-hidden="true">&times;</span></button>
          <h3 className="panel-title">Random Pick</h3>
        </div>
        <div className="panel-body">
          <div className="row">
            {this.state.random.studentTitle}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = StudentRandom;

