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
    console.log("index", index);
    console.log("propsare",this.state.list);
    ClassroomActions.behaviorClicked(this.props.studentId, index, points)
    console.log("points", points);
    console.log("student clicked is", this.props);

  },

  render: function() {
    var buttonClicked = this.buttonClicked;
    var studentBehaviors = _.map(this.state.info.behavior, function(points, index){
      return (
        <button key={index} onClick={buttonClicked.bind(null, points, index)}>{index}</button>
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
