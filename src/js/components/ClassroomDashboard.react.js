var React = require('react');
var Modal = require('react-modal');
var ClassroomStudent = require('./ClassroomStudent.react');
var ClassroomActions = require('../actions/ClassroomActions');
var ClassroomStore = require('../stores/ClassroomStore');
var ClassroomForm = require('./ClassroomForm.react');
var authStore = require('../stores/AuthStore');

var ClassroomDashboard = React.createClass({
  getInitialState: function(){
    if(!authStore.checkAuth()){
      location.hash = '/login';
    }
    //set list upon initialstate w/ ClassroomStore.getList
    return {
      list: ClassroomStore.getList()
    }
  },
  componentDidMount: function(){
    ClassroomStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function(){
    ClassroomStore.removeChangeListener(this._onChange);
  },
  _onChange: function(){
    this.setState({
      list: ClassroomStore.getList()
    })
  },
  render: function(){
    var studentNodes = this.state.list.map(function(studentNode,index){
      return (
        <ClassroomStudent key={index} studentTitle={studentNode.studentTitle} behavior={studentNode.behavior}/>
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
