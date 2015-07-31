var React = require('react');
var AuthStore = require('../stores/AuthStore');
var ClassroomStore = require('../stores/ClassroomStore');
var ClassroomActions = require('../actions/ClassroomActions');
var _ = require('underscore');

var ClassroomForm = React.createClass({
  getInitialState: function(){
    return {
      newStudent: ''
    }
  },

  componentWillMount: function(){
    if(!AuthStore.checkAuth()){
      this.render = function () {
        return false;
      }
      location.hash = '/';
    }
  },

  handleAddStudent: function(e){
    e.preventDefault();

    var newStudent = React.findDOMNode(this.refs.newStudent).value;

    var setBehavior = ClassroomStore.getInfo().behavior;

    for(var key in setBehavior){
      setBehavior[key] = 0;
    }

    ClassroomActions.addStudent({studentTitle: newStudent, behavior: setBehavior, behaviorTotal: 0  });

    React.findDOMNode(this.refs.newStudent).value = '';

    this.props.closeAddStudentModal();
  },

  render: function() {
    return (
      <div className="classroomForm">
        <div className="well text-center">
          <button type="button" className="close" aria-label="Close" onClick={this.props.closeAddStudentModal}><span aria-hidden="true">&times;</span></button>
          <form onSubmit={this.handleAddStudent}> 
            <label>Add student</label>
            <div className="form-group">
              <input type="text" ref="newStudent" id="newStudent" className="form-control" placeholder="Example: John Doe" required />
            </div>
            <button type="submit" id="addNewStudent" className="btn btn-primary btn-block submit-button">Add student!</button>
          </form>
        </div> 
      </div>
    );
  }

});

module.exports = ClassroomForm;
