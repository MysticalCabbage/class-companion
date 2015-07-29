var React = require('react');
var AuthStore = require('../stores/AuthStore');
var ClassroomStore = require('../stores/ClassroomStore');
var ClassroomActions = require('../actions/ClassroomActions');
var _ = require('underscore');

var ClassroomForm = React.createClass({
  getInitialState: function(){
    return {
      newStudent: '',
      errMsg: null
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

    this.setState({errMsg: null });

    var newStudent = React.findDOMNode(this.refs.newStudent).value;

/*  // validate user input  
    var setErrMsg = function(errMsg){
      this.setState({errMsg: errMsg});
      React.findDOMNode(this.refs.newStudent).value = '';
      return null;
    }.bind(this);

    var validateSpaces = newStudent.match(/\s/g);
    var validateLength = _.reduce(newStudent.split(' '), function(max, cur){
      return cur.length > max ? cur.length : max;
    }, 0);

    if(validateSpaces && validateSpaces.length > 2){
      return setErrMsg('Student name should follow format.');
    } else if(validateLength > 10){
      return setErrMsg('Student first, middle, or last name should be 10 characters or less');
    }*/

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
            {this.state.errMsg ? <div className="errMsg">{this.state.errMsg}</div> : null}
            <div className="form-group">
              <input type="text" ref="newStudent" id="newStudent" className="form-control" placeholder="Format: First Name Middle Initial Last Name" required />
            </div>
            <button type="submit" id="addNewStudent" className="btn btn-primary btn-block submit-button">Add student!</button>
          </form>
        </div> 
      </div>
    );
  }

});

module.exports = ClassroomForm;
