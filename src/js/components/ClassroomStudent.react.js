var React = require('react');
var ClassroomActions = require('../actions/ClassroomActions');

var ClassroomStudent = React.createClass({
  getInitialState: function(){
    console.log(this.props);
    return null;
  },
  removeStudent: function(){
    ClassroomActions.removeStudent(this.props.studentTitle);
  },
  render: function(){
    return (
        <div className="classroomStudent col-md-3">
          <div className="well">
          <a href="#" onDoubleClick={this.removeStudent}>{this.props.studentTitle}</a>
          </div>
        </div>
    );
  }
});

module.exports = ClassroomStudent;
