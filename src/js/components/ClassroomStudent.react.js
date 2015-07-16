var React = require('react');
var ClassroomActions = require('../actions/ClassroomActions');

var ClassroomStudent = React.createClass({
  getInitialState: function(){
    return null;
  },
  removeStudent: function(){
    ClassroomActions.removeStudent(this.props.studentTitle);
  },
  addPoint: function(){
    ClassroomActions.addPoint(this.props.studentTitle);
  },
  subtractPoint: function(){
    ClassroomActions.subtractPoint(this.props.studentTitle);
  },
  render: function(){
    return (
      <div className="classroomStudent col-md-3">
          <div className="well">
              <div className="row">
                <div className="col-md-4 col-md-offset-4">
                  <button type="button" className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                </div>
              </div>
                <div className="row">
                  <span className="label label-default">{this.props.behavior}</span>
                </div>  
              <div className="row">
                <a onDoubleClick={this.removeStudent}>{this.props.studentTitle}</a>
              </div>
              <div className="row">
                <button type="button" onClick={this.addPoint} className="btn btn-success">+</button>
                <button type="button" onClick={this.subtractPoint} className="btn btn-danger">-</button>
              </div>
          </div>
        </div>
    );
  }
});

module.exports = ClassroomStudent;
