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
      <div className="StudentRandom col-md-3">
        <div className="well">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div>Random Pick</div>
            <button type="button" className="close" aria-label="Close" onClick={this.closeModal}><span aria-hidden="true">&times;</span></button>
          </div>
        </div>
          <div>{this.state.random.studentTitle}</div>
        </div>
      </div>
    );
  }
});

module.exports = StudentRandom;
