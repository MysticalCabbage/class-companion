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
    //grabs input value of newStudent from form
    var newStudent = React.findDOMNode(this.refs.newStudent).value;
    var setBehavior = ClassroomStore.getInfo().behavior;
    //When creating a new student, set their initial behaviorType count to 0
    for(var key in setBehavior){
      setBehavior[key] = 0;
    }
    ClassroomActions.addStudent({studentTitle: newStudent, behavior: setBehavior, behaviorTotal: 0 });
    //Set input value back to ""
    React.findDOMNode(this.refs.newStudent).value = '';

    this.props.closeAddStudentModal();
  },

  render: function() {
    return (
      <div className="panel panel-info classroomForm">
        <div className="panel-heading">
          <button type="button" className="close" aria-label="Close" onClick={this.props.closeAddStudentModal}><span aria-hidden="true">&times;</span></button>
          <h3 className="panel-title text-center">Add Student</h3>
        </div>
        <div className="well text-center">
          <form onSubmit={this.handleAddStudent}> 
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
