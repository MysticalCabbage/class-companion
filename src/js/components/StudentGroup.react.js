var React = require('react');
var StudentSelectionStore = require('../stores/StudentSelectionStore');
var _ = require('underscore');

var StudentGroup = React.createClass({
  getInitialState: function(){
    return {
      groups: StudentSelectionStore.getGroup()
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
      groups: StudentSelectionStore.getGroup()
    });
  },
  closeModal: function(){
    console.log('close');
  },
  render: function(){
    var groupStudent;
    var groups = _.map(this.state.groups, function(group, index){
      groupStudent = _.reduce(group, function(acc, cur){
        return acc += cur.studentTitle + ' ';
      },' ');
      return (
        <p key={index}> {groupStudent}</p>
        )
    });

    return (
      <div className="StudentRandom col-md-3">
        <div className="well">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div>Groups</div>
            <button type="button" className="close" aria-label="Close" onClick={this.closeModal}><span aria-hidden="true">&times;</span></button>
          </div>
        </div>
          <div>{groups}</div>
        </div>
      </div>
    );
  }
});

module.exports = StudentGroup;
