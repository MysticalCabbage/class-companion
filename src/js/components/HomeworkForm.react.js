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

  // componentDidMount: function(){ 
  //   HomeworkActions.initQuery(this.props.classId);
  //   HomeworkStore.addChangeListener(this._onChange);
  //   AuthStore.addChangeListener(this._onChange);
  // },

  // componentWillUnmount: function(){
  //   HomeworkActions.endQuery();
  //   HomeworkStore.removeChangeListener(this._onChange);
  //   AuthStore.removeChangeListener(this._onChange);
  // },

  homeworkSubmit: function(e){
    e.preventDefault();
    var homeworkAssignment = React.findDOMNode(this.refs.homeworktitle).value;
    var dueDate = React.findDOMNode(this.refs.duedate).value.split("-");
    var today = new Date();
    var dd = today.getDate(); 
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd} 
    if(mm<10){mm='0'+mm} 
    var todaysDate = mm + '-' + dd + '-' + yyyy;
    var formattedDate = dueDate[1] + "-" + dueDate[2] + "-" + dueDate[0];
    HomeworkActions.addAssignment({ assignment: homeworkAssignment, dueDate: formattedDate, classId: this.props.classId, assignedOn: todaysDate });
    React.findDOMNode(this.refs.homeworktitle).value = "";
  },

  render: function(){
    return (
      <div className="homeworkForm">
        <div className="well">
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
