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
    return (
      <div className="teacherClass col-md-3">
        <div className="well">
          <a onDoubleClick={this.removeClass}>{this.props.classTitle}</a>
        </div>
      </div>
    );
  }

});

module.exports = TeacherClass;
