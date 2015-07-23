var React = require('react');
var ClassroomActions = require('../actions/ClassroomActions');
var AuthStore = require('../stores/AuthStore');
var ClassroomStore = require('../stores/ClassroomStore');

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
    console.log("newstudentis",newStudent);
    React.findDOMNode(this.refs.newStudent).value = '';
    this.props.closeModal();
  },

  render: function() {
    return (
      <div className="classroomForm">
        <div className="well text-center">
          <form>
            <label for="">Add student</label>
            <div className="form-group">
              <input type="text" ref="newStudent" id="newStudent" className="form-control" placeholder="new student"  />
            </div>
            <button type="submit" id="addNewStudent" onClick={this.handleAddStudent} className="btn btn-primary btn-block submit-button">Add student!</button>
          </form>
        </div> 
      </div>
    );
  }

});

module.exports = ClassroomForm;
