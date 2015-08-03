var React = require('react');
var HomeworkActions = require('../actions/HomeworkActions');
var HomeworkStore = require('../stores/HomeworkStore');
var ClassroomStore = require('../stores/ClassroomStore');
var ClassroomActions = require('../actions/ClassroomActions');
var AuthStore = require('../stores/AuthStore');

var HomeworkForm = React.createClass({
  getInitialState: function(){
    return null
  },

  componentWillMount: function(){
    if(!AuthStore.checkAuth()){
      this.render = function () {
        return false;
      }
      location.hash = '/';
    }
  },

  homeworkSubmit: function(e){
    e.preventDefault();
    //selects input value from homeworkinput form-control and duedate from date input for dispatch
    var homeworkAssignment = React.findDOMNode(this.refs.homeworktitle).value;
    var dueDate = React.findDOMNode(this.refs.duedate).value.split("-");
    //moment.js to create today's date value
    var today = moment().format('MM-DD-YYYY');
    var formattedDate = dueDate[1] + "-" + dueDate[2] + "-" + dueDate[0];
    //send assignment name, due date, classId, and today's date to dispatcher
    HomeworkActions.addAssignment({ assignment: homeworkAssignment, dueDate: formattedDate, classId: this.props.classId, assignedOn: today, monthYear: [dueDate[1], dueDate[0]] });
    React.findDOMNode(this.refs.homeworktitle).value = "";
  },

  render: function(){
    return (
      <div className="homeworkForm">
        <div className="wellhomework">
          <form className="form-inline" onSubmit={this.homeworkSubmit}>
            <div className="form-group">
              <label htmlFor="exampleInputName2" ></label>
              <input type="text" className="homeworkinput form-control" id="exampleInputName2" placeholder="Enter Assignment" ref="homeworktitle" required/>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail2"></label>
              <input type="date" className="form-control" id="dateinput" ref="duedate" required/>
            </div>
            <button type="submit" className="btn btn-default">Save</button>
          </form><br/>
        </div> 
      </div>
    );
  }
});

module.exports = HomeworkForm;
