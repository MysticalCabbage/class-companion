var React = require('react');
var ClassroomActions = require('../actions/ClassroomActions');

var StudentGroupForm = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();

    var groupNumNode = React.findDOMNode(this.refs.groupNum);
    var groupNum = groupNumNode.value;
    groupNumNode.value = '';

    ClassroomActions.randGroup(groupNum);

    this.props.closeModal();
  },
  render: function() {
    return (
      <div className="panel panel-info StudentGroupForm">
        <div className="panel-heading">
          <button type="button" className="close" aria-label="Close" onClick={this.props.closeModal}><span aria-hidden="true">&times;</span></button>
          <h3 className="panel-title">Enter # of Groups</h3>
        </div>
          <form className="form-horizontal" id="frmGroup" role="form" onSubmit={this.handleSubmit}>
            <div className="panel-body">
              <input pattern="[0-9]*" className="form-control" placeholder="Group Size" ref="groupNum" required/>
            </div>
          </form>
      </div>
    );
  }

});

module.exports = StudentGroupForm;
