var React = require('react');
var TeacherActions = require('../actions/TeacherActions');

var TeacherClass = React.createClass({
  getInitialState: function(){
    return null;
  },

  removeClass: function(e){
    TeacherActions.removeClass(this.props.classId);
  },

  render: function() {
    var url = '#/classroomDashboard/' + this.props.classId;
    return (
      <div className="teacherClass col-md-3">
        <div className="well">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <button type="button" className="close" aria-label="Close" onClick={this.removeClass}><span aria-hidden="true">&times;</span></button>
          </div>
        </div>
          <a href={url}>{this.props.classTitle}</a>
        </div>
      </div>
    );
  }

});

module.exports = TeacherClass;
