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
        <div className="behaviorThumbnail col-xs-6">
          <a className="thumbnail" key={index} onClick={buttonClicked.bind(null, points, index)}>
            {index}
          </a>
        </div>
      )
    })
    return (
      <div className="panel panel-info behaviorButtons">
        <div className="panel-heading">
          <button type="button" className="close" aria-label="Close" onClick={this.props.closeBehaviorModal}><span aria-hidden="true">&times;</span></button>
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
