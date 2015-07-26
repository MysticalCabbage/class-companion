var React = require('react');
var HomeworkActions = require('../actions/HomeworkActions');
var HomeworkStore = require('../stores/HomeworkStore');
var ClassroomStore = require('../stores/ClassroomStore');
var ClassroomActions = require('../actions/ClassroomActions');
var AuthStore = require('../stores/AuthStore');

var HomeworkForm = React.createClass({
  getInitialState: function(){
    return {
      info: ClassroomStore.getInfo()
    }
  },

  componentWillMount: function(){
    if(!AuthStore.checkAuth()){
      this.render = function () {
        return false;
      }
      location.hash = '/';
    }
  },

  componentDidMount: function(){ 
    ClassroomActions.initQuery(this.props.classId);
    HomeworkStore.addChangeListener(this._onChange);
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    ClassroomActions.endQuery();
    HomeworkStore.removeChangeListener(this._onChange);
    AuthStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
   
  },

  homeworkSubmit: function(){
    var homeworkAssignment = React.findDOMNode(this.refs.homeworktitle).value;
    var dueDate = React.findDOMNode(this.refs.duedate).value.split("-");
    var formattedDate = dueDate[1] + "-" + dueDate[2] + "-" + dueDate[0];
    HomeworkActions.addAssignment({ assignment: homeworkAssignment, dueDate: formattedDate, classId: this.props.classId});
    React.findDOMNode(this.refs.homeworktitle).value = "";
  },

  render: function(){
    return (
      <div className="homeworkForm">
        <div className="well">
          <form className="form-inline" onSubmit={this.homeworkSubmit}>
            <div className="form-group">
              <label for="exampleInputName2" ></label>
              <input type="text" className="homeworkinput form-control" id="exampleInputName2" placeholder="Enter Assignment and Due Date" ref="homeworktitle"/>
            </div>
            <div className="form-group">
              <label for="exampleInputEmail2"></label>
              <input type="date" className="form-control" id="dateinput" ref="duedate"/>
            </div>
            <button type="submit" className="btn btn-default">Save</button>
          </form><br/>
        </div> 
      </div>
    );
  }
});

module.exports = HomeworkForm;
