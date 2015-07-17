var React = require('react');
var Modal = require('react-modal');
var ClassroomStudent = require('./ClassroomStudent.react');
var ClassroomActions = require('../actions/ClassroomActions');
var ClassroomStore = require('../stores/ClassroomStore');
var ClassroomForm = require('./ClassroomForm.react');
var AuthStore = require('../stores/AuthStore');
var Navbar = require('./Navbar.react');
var Timer = require('./ClassroomTimer.react.js');
var _ = require('underscore');

var Results = React.createClass({
    render: function() {
      return <div id="results"><Timer initialTimeRemaining={300000}/></div>;
    }
  });

var ClassroomDashboard = React.createClass({
  getInitialState: function(){
    //set list upon initialstate w/ ClassroomStore.getList
    return {
      list: ClassroomStore.getList(),
      info: ClassroomStore.getInfo(),
      loggedIn: AuthStore.checkAuth()
    }
  },

  componentWillMount: function(){
    if(!AuthStore.checkAuth()){
      this.render = function () {
        return false;
      }
      location.hash = '/login';
      showResults: false
    }
  },

  componentDidMount: function(){ 
    ClassroomActions.initQuery(this.props.params.id);
    ClassroomStore.addChangeListener(this._onChange);
    AuthStore.addChangeListener(this._onChange);
  },


  componentWillUnmount: function(){
    ClassroomActions.endQuery();
    ClassroomStore.removeChangeListener(this._onChange);
    AuthStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({
      list: ClassroomStore.getList(),
      info: ClassroomStore.getInfo(),
      loggedIn: AuthStore.checkAuth()
    })
  },
  
  timerClick: function(){
    this.setState({showResults: !this.state.showResults});
  },
  render: function(){
    var studentNodes = _.map(this.state.list, function(studentNode,index){
      return (
        <ClassroomStudent key={index} studentId={index} studentTitle={studentNode.studentTitle} behavior={studentNode.behavior}/>
      )
    })
    return (
      <div className="classroomDashboard">
        <Navbar loggedIn = {this.state.loggedIn}/>
        <div className="container">
          <button type="button" className="btn btn-info" onClick={this.timerClick}>Start Timer</button>
          {this.state.showResults ? <Results/> : null}
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
      </div>
    );
  }
});

module.exports = ClassroomDashboard;
