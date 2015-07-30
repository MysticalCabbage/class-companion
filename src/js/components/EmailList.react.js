var React = require('react');
var HomeworkActions = require('../actions/HomeworkActions');
var HomeworkStore = require('../stores/HomeworkStore');
var ClassroomStore = require('../stores/ClassroomStore');
var ClassroomActions = require('../actions/ClassroomActions');
var _ = require('underscore');

var Student = React.createClass({
  getInitialState: function(){
    return {
      email: undefined,
      parentEmail: undefined 
    }
  },
  clicked: function(){
    console.log("clicked");
  },  
  addStudent: function(){
    console.log("addstudent clicked");
  },
  addParent: function(){
    console.log("add parent clicked");
  },
  render: function(){
    if(this.props.email === undefined){
      var email = "No email added! Click here to add";
    } else {
      var email = this.props.email;
    }
    if(this.props.parentEmail === undefined){
      var parentEmail = "No Parent email added! Click here to add";
    } else {
      var parentEmail = this.props.parentEmail;
    }
    return (
        <tr>
        <td>{this.props.studentTitle}</td>
        <td><a onClick={this.addStudent}>{email}</a></td>
        <td><a className='fa fa-envelope-o' onClick={this.clicked}></a></td>
        <td><a onClick={this.addParent}>{parentEmail}</a></td>
        <td><a className='fa fa-envelope-o' onClick={this.clicked}></a></td>
        </tr>
    );
  }
});


var EmailList = React.createClass({
  getInitialState: function(){
    return {
      list: ClassroomStore.getList()
    }
  },
  _onChange: function(){
    this.setState({
        list: ClassroomStore.getList(),
    });
  },

  componentDidMount: function(){
    ClassroomStore.addChangeListener(this._onChange);    
  },

  componentWillUnmount: function(){
    ClassroomStore.removeChangeListener(this._onChange);
  },

  render: function(){
    console.log(this.state.list);
    var students = _.map(this.state.list, function(student,index){
      return (
        <Student key={index} studentId={index} studentTitle={student.studentTitle}/>
      );
    });
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Students</h3>
        </div>
        <table className="table" id="emailtable">
            <thead>
            <tr>
              <th><h5>Name</h5></th>
              <th><h5>Student E-Mail</h5></th>
              <th><h5></h5></th>
              <th><h5>Parent E-mail</h5></th>
              <th><h5></h5></th>
            </tr>
            </thead>
            <tbody>
            {students}
            </tbody>
          </table>    
      </div>
    );
  }
});




module.exports = EmailList;
