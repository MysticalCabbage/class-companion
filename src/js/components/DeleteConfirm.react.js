var React = require('react');

var DeleteConfirm = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();

    if(e.target.id === 'confirmDelete'){
      this.props.confirmDelete();
    }
    
    this.props.closeDeleteConfirmModal();
  },

  render: function() {
    return (
      <div className="panel panel-info deleteConfirmModal">
        <div className="panel-heading">
          <h3 className="panel-title">Confirm Delete?</h3>
        </div>
        <div className="well text-center">
          <div className="panel-body">Are you sure you want to delete?</div>
          <button type="button" id="confirmDelete" className="btn btn-danger btn-block" onClick={this.handleSubmit}>Yes</button>
          <button type="button" id="cancelDelete" className="btn btn-primary btn-block" onClick={this.handleSubmit}>Cancel</button>
        </div>
      </div>
    );
  }

});

module.exports = DeleteConfirm;
