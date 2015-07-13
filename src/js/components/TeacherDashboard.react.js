var React = require('react');
var TeacherClass = require('./TeacherClass.react');
var TeacherActions = require('../actions/TeacherActions');
var TeacherStore = require('../stores/TeacherStore');
var TeacherForm = require('./TeacherForm.react');


var TeacherDashboard = React.createClass({
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

  // Invoking the addClass method on our TeacherActions whenever a addClass user event occurs
  handleAddClass: function(newClass){
    TeacherActions.addClass(newClass);
  },

  render: function() {
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
              <a href="#" add={this.handleAddClass}>Add Class +</a>
            </div>
          </div>
          <TeacherForm />
        </div>
      </div>
    );
  }

});

module.exports = TeacherDashboard;
