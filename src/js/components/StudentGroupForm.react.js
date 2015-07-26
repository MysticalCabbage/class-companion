var React = require('react');
var ClassroomActions = require('../actions/ClassroomActions');

var StudentGroupForm = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();

    var groupSizeNode = React.findDOMNode(this.refs.groupSize);
    var groupSize = groupSizeNode.value;
    groupSizeNode.value = '';

    ClassroomActions.randGroup(groupSize);

    this.props.closeModal();
  },
  render: function() {
    return (
      <div className="panel panel-info StudentGroupForm">
        <div className="panel-heading">
          <button type="button" className="close" aria-label="Close" onClick={this.props.closeModal}><span aria-hidden="true">&times;</span></button>
          <h3 className="panel-title">Enter Group Size</h3>
        </div>
          <form className="form-horizontal" id="frmGroup" role="form" onSubmit={this.handleSubmit}>
            <div className="panel-body">
              <input pattern="[0-9]*" className="form-control" placeholder="Group Size" ref="groupSize" required/>
            </div>
          </form>
      </div>
    );
  }

});

module.exports = StudentGroupForm;
