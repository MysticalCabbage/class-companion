var React = require('react');
var TeacherClass = require('./TeacherClass.react');
var TeacherActions = require('../actions/TeacherActions');
var TeacherStore = require('../stores/TeacherStore');
var TeacherForm = require('./TeacherForm.react');
var AuthStore = require('../stores/AuthStore');
var Router = require('react-router');
var Link = Router.Link;
var _ = require('underscore');

var TeacherDashboard = React.createClass({
  // Invoke TeacherStore.getList() and set the result to the list property on our state
  getInitialState: function(){
    return {
      list: TeacherStore.getList(),
      info: TeacherStore.getInfo()
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

  // Call the addChangeListener method on TeacherStore to add an event listener
  componentDidMount: function(){
    // query firebase for logged in user information
    var authData = AuthStore.checkAuth();
    if(authData){
      TeacherActions.initQuery(authData.uid);
    }
    TeacherStore.addChangeListener(this._onChange);
  },

  // Call the removeChangeListener method on TeacherStore to remove an event listener
  componentWillUnmount: function(){
    TeacherActions.endQuery();
    TeacherStore.removeChangeListener(this._onChange);
  },

  // Whenever data in the store changes, fetch data from the store and update the component state
  _onChange: function(){
    this.setState({
      list: TeacherStore.getList(),
      info: TeacherStore.getInfo()
    })
  },

  render: function() {
    var classNodes = _.map(this.state.list, function(classNode, index){
      return (
        <TeacherClass key={index} classId={index} classTitle={classNode.classTitle}/>
      )
    });

    return (
      <div className="teacherDashboard container">
        <div className="row">
          {classNodes}
          <div className="teacherClass col-md-3">
            <div className="well">
              <Link to="/teacherForm">Add Class +</Link>
            </div>
          </div>
          <TeacherForm />
        </div>
      </div>
    );
  }

});

module.exports = TeacherDashboard;
