var React = require('react');

var TeacherClass = React.createClass({
  getInitialState: function(){
    console.log(this.props);
    return null;
  },

  render: function() {
    return (
      <div className="teacherClass col-md-3">
        <div className="well">
          <a href="#">{this.props.classTitle}</a>
        </div>
      </div>
    );
  }

});

module.exports = TeacherClass;
