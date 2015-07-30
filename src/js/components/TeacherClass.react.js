var React = require('react');
var TeacherActions = require('../actions/TeacherActions');
var DeleteConfirm = require('./DeleteConfirm.react');
var Modal = require('react-modal');

var TeacherClass = React.createClass({
  getInitialState: function(){
    return {
      deleteConfirmModal: false
    };
  },

  openDeteleConfirmModal: function(){
    this.setState({deleteConfirmModal: true});
  },

  closeDeleteConfirmModal: function(){
    this.setState({deleteConfirmModal: false});
  },

  removeClass: function(e){
    TeacherActions.removeClass(this.props.classId);
  },

  render: function() {
    var url = '#/classroomDashboard/' + this.props.classId;
    return (
      <div className="teacherClass col-md-3">
        <div className="well">
          <button type="button" className="close" aria-label="Close" onClick={this.openDeteleConfirmModal}><span aria-hidden="true">&times;</span></button>
          <a href={url}>
            <div>
              <img className="classImg" src="./assets/classIcon.png" alt="" />
            </div>
            {this.props.classTitle}
          </a>
        </div>
        <Modal className="deleteConfirmModal"
          isOpen={this.state.deleteConfirmModal}
          onRequestClose={this.closeDeleteConfirmModal}>
          <DeleteConfirm closeDeleteConfirmModal={this.closeDeleteConfirmModal}
            confirmDelete={this.removeClass}/>
        </Modal>
      </div>
    );
  }

});

module.exports = TeacherClass;
