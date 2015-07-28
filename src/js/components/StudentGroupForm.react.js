var React = require('react');
var ClassroomActions = require('../actions/ClassroomActions');

var StudentGroupForm = React.createClass({
  componentDidMount: function(){
  },

  componentWillUnmount: function(){
  },

  handleSubmit: function(e){
    e.preventDefault();

    var groupNum;
    var groupNumNode = React.findDOMNode(this.refs.groupNum);

    if(e.target.id === 'removeGroups'){
      groupNum = 1;
    } else {
      groupNum = groupNumNode.value;
      groupNumNode.value = '';
    }

    ClassroomActions.randGroup(groupNum);
    this.props.closeModal();
  },
  
  render: function() {
    return (
      <div className="panel panel-info StudentGroupForm">
        <div className="panel-heading">
          <button type="button" className="close" aria-label="Close" onClick={this.props.closeModal}><span aria-hidden="true">&times;</span></button>
          <h3 className="panel-title">Groups</h3>
        </div>
        <form className="form-horizontal" id="frmGroup" role="form" onSubmit={this.handleSubmit}>
          <div className="panel-body">
            <input pattern="[0-9]*" className="form-control" placeholder="Enter # of Groups" ref="groupNum" required/>
          </div>
          <button type="submit" id="selectGroups" className="btn btn-primary btn-block submit-button">Group!</button>
        </form>
          <button type="button" id="removeGroups" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Remove Groups</button>
      </div>
    );
  }

});

module.exports = StudentGroupForm;
