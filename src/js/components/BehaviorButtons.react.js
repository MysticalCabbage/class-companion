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
    ClassroomActions.behaviorClicked(this.props.studentId, index, points)
  },

  render: function() {
    var buttonClicked = this.buttonClicked;
    var studentBehaviors = _.map(this.state.info.behavior, function(points, index){
      return (
        <button type="button" className="btn btn-default" key={index} onClick={buttonClicked.bind(null, points, index)}>{index}</button>
      )
    })
    return (
      <div>
        {studentBehaviors}
      </div>
    );
  }

});

module.exports = BehaviorButtons;
