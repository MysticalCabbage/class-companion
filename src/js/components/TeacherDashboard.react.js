var React = require('react');
var TeacherClass = require('./TeacherClass.react');
var TeacherActions = require('../actions/TeacherActions');
var TeacherStore = require('../stores/TeacherStore');
var TeacherForm = require('./TeacherForm.react');
var Auth = require('./Auth.react');
var Router = require('react-router');
var Link = Router.Link;

var TeacherDashboard = React.createClass({
  mixins: [ Auth.Authentication ],
  // Invoke TeacherStore.getList() and set the result to the list property on our state
  getInitialState: function(){
    return {
      list: TeacherStore.getList()
    }
  },

  // Call the addChangeListener method on TeacherStore to add an event listener
  componentDidMount: function(){
    TeacherStore.addChangeListener(this._onChange);
  },

  // Call the removeChangeListener method on TeacherStore to remove an event listener
  componentWillUnmount: function(){
    TeacherStore.removeChangeListener(this._onChange);
  },

  // Whenever data in the store changes, fetch data from the store and update the component state
  _onChange: function(){
    this.setState({
      list: TeacherStore.getList()
    })
  },

  render: function() {
    console.log(this.state.list);
    var classNodes = this.state.list.map(function(classNode, index){
      return (
        <TeacherClass key={index} classTitle={classNode.classTitle}/>
      )
    })

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
