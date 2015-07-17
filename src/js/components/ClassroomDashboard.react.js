var React = require('react');
var Modal = require('react-modal');
var ClassroomStudent = require('./ClassroomStudent.react');
var ClassroomActions = require('../actions/ClassroomActions');
var ClassroomStore = require('../stores/ClassroomStore');
var ClassroomForm = require('./ClassroomForm.react');
var authStore = require('../stores/AuthStore');
var _ = require('underscore');

var ClassroomDashboard = React.createClass({
  getInitialState: function(){
    //set list upon initialstate w/ ClassroomStore.getList
    return {
      list: ClassroomStore.getList(),
      info: ClassroomStore.getInfo()
    }
  },

  componentWillMount: function(){
    if(!AuthStore.checkAuth()){
      this.render = function () {
        return false;
      }
      location.hash = '/login';
    }
  },

  componentDidMount: function(){ 
    ClassroomActions.initQuery(this.props.params.id);
    ClassroomStore.addChangeListener(this._onChange);
  },


  componentWillUnmount: function(){
    ClassroomActions.endQuery();
    ClassroomStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({
      list: ClassroomStore.getList(),
      info: ClassroomStore.getInfo()
    })
  },
  
  render: function(){
    var studentNodes = _.map(this.state.list, function(studentNode,index){
      return (
        <ClassroomStudent key={index} studentId={index} studentTitle={studentNode.studentTitle} behavior={studentNode.behavior}/>
      )
    })
    return (
      <div className="classroomDashboard container">
        <div className="row">
        {studentNodes}
          <div className="classroom col-md-3">
            <div className="well">
              <a>Add Student</a>
            </div>
          </div>
         <ClassroomForm />
        </div>
      </div>
    );
  }
});

module.exports = ClassroomDashboard;
