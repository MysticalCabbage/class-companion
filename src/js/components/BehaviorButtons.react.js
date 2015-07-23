var React = require('react');
var ClassroomStore = require('../stores/ClassroomStore');
var ClassroomActions = require('../actions/ClassroomActions');
var _ = require('underscore');

var BehaviorButtons = React.createClass({
  getInitialState: function(){
    return {
       info: ClassroomStore.getInfo(),
       list: ClassroomStore.getList()
    }
  },

  buttonClicked: function(points, index){
    this.props.closeBehaviorModal();
    ClassroomActions.behaviorClicked(this.props.studentId, index, points)
  },

  render: function() {
    var buttonClicked = this.buttonClicked;
    var studentBehaviors = _.map(this.state.info.behavior, function(points, index){
      return (        
        <div className="col-xs-6">
          <a className="thumbnail" key={index} onClick={buttonClicked.bind(null, points, index)}>
            {index}
          </a>
        </div>
      )
    })
    return (
      <div className="panel panel-primary behaviorButtons">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.studentTitle}</h3>
        </div>
        <div className="panel-body">
          <div className="row">
            {studentBehaviors}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = BehaviorButtons;
