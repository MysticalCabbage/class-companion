var React = require('react');
var TeacherActions = require('../actions/TeacherActions');

var TeacherClass = React.createClass({
  getInitialState: function(){
    return null;
  },

  removeClass: function(e){
    TeacherActions.removeClass(this.props.classTitle);
  },

  render: function() {
    var url = '#/classroomDashboard/' + this.props.classId;
    return (
      <div className="teacherClass col-md-3">
        <div className="well">
          <a href={url}>{this.props.classTitle}</a>
        </div>
      </div>
    );
  }

});

module.exports = TeacherClass;
