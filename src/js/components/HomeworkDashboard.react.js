var React = require('react');
var HomeworkForm = require('./HomeworkForm.react');
var HomeworkActions = require('../actions/HomeworkActions');
var HomeworkStore = require('../stores/HomeworkStore');
var Navbar = require('./Navbar.react');
var AuthStore = require('../stores/AuthStore');
var EmailList = require('./EmailList.react')
var _ = require('underscore');

var HomeworkAssignment = React.createClass({
  getInitialState: function(){
    return null
  },
  
  //for deleting homework assignments (delete by ID)
  removeHW: function(){
    HomeworkActions.removeAssignment(this.props.hwId)
  },

  render: function(){
    return (
      <tr>
          <th><img className="behaviorImg" src={this.props.status} alt="" /> {this.props.title}</th>
          <th>{this.props.dueDate}</th>
          <th>{this.props.assignedOn}</th>
          <th><button type="button" className="close" aria-label="Close" onClick={this.removeHW}><span aria-hidden="true">&times;</span></button></th>
        </tr>
    );
  }
});

var HomeworkDashboard = React.createClass({
  getInitialState: function(){
    return {
      loggedIn: AuthStore.checkAuth(),
      list: HomeworkStore.getList(),
      assignments: HomeworkStore.getAssignments(),
      pastAssignments: HomeworkStore.getPastAssignments(),
      monthAssignments: HomeworkStore.getMonthAssignments,
      emails: HomeworkStore.getEmails(),
      parentEmails: HomeworkStore.getParentEmails(),
      showPastAssignments: false,
      showCurrentAssignments: true,
      showMonthAssignments: false
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
    var authData = AuthStore.checkAuth();
    if(authData){
      HomeworkActions.initQuery(this.props.params.id);
    }
    HomeworkStore.addChangeListener(this._onChange);
    AuthStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function(){
    HomeworkActions.endQuery();
    HomeworkStore.removeChangeListener(this._onChange);
    AuthStore.removeChangeListener(this._onChange);
  },

  _onChange: function(){
    this.setState({
      list: HomeworkStore.getList(),
      assignments: HomeworkStore.getAssignments(),
      loggedIn: AuthStore.checkAuth(),
      pastAssignments: HomeworkStore.getPastAssignments(),
      monthAssignments: HomeworkStore.getMonthAssignments(),
      parentEmails: HomeworkStore.getParentEmails(),
      emails: HomeworkStore.getEmails()
    });
  },

  //show assignments that had a due date before todays date
  showPastAssignments: function(){
    this.setState({
      showPastAssignments: true,
      showCurrentAssignments: false,
      showMonthAssignments: false
    });
  },

  //used to show assignments that are not past due date
  showCurrentAssignments: function(){
    this.setState({
      showPastAssignments: false,
      showCurrentAssignments: true,
      showMonthAssignments: false
    });
  },

  //when a month is selected from drop down, dispatcher retrieves homework assignments from that month
  monthSelect: function(e){
    var month = document.getElementById('dropdown').value;
    if(month === "N/A"){
      this.setState({
        showMonthAssignments: false,
      showPastAssignments: false,
      showCurrentAssignments: true,
      });
    } else {
      HomeworkActions.monthSelected(month);
      this.setState({
        showMonthAssignments: true,
        showPastAssignments: false,
        showCurrentAssignments: false,
      });
    }
  },

  // mail to e-mail sent out to parents and students (separately)
  sendAssignments: function(){
    var today = moment().format('MM-DD-YYYY');
    //selects only assignments that were assigned today
    var assignments = _.filter(this.state.assignments, function(assignment){
      return assignment.assignedOn === today;
    });
    //personalizing body of e-mail message with HW assignment title and due date
    var bodyText = _.map(assignments, function(assignment){
      return assignment.assignment + ": due " + assignment.dueDate;
    });

    var parentEmails = [];
    for(var key in this.state.parentEmails){
      parentEmails.push(this.state.parentEmails[key]);
    }
    //join all parent e-mails into one string
    parentEmails = parentEmails.join(",");

    var studentEmails = [];
    for(var key in this.state.emails){
      studentEmails.push(this.state.emails[key]);
    }
    //join all student e-mails to one string
    studentEmails = studentEmails.join(",");

    var studentLink = "mailto:" + studentEmails + "?cc=" +   "&subject=" + escape("Homework assigned on " + today) + "&body=" + escape(bodyText.join("\n"));

    var parentLink = "mailto:" + parentEmails + "?cc=" +   "&subject=" + escape("Homework assigned on " + today) + "&body=" + escape(bodyText.join("\n"));
    
    window.location.href = studentLink;
    window.location.href = parentLink;
  },

  render: function(){
    var url = '#/classroomDashboard/' + this.props.params.id;
    var today = moment().format('MM-DD-YYYY');
    var todaysDate = today.slice(0,5);
    
    var currentAssignments = {};
    for(var assignment in this.state.assignments){
      if((this.state.assignments[assignment].dueDate.slice(0,5) >= todaysDate) && ((today.slice(6,10) <= this.state.assignments[assignment].dueDate.slice(6,10)))) {
          currentAssignments[assignment] = this.state.assignments[assignment];
      }
    }
    //on default, only current assignments are shown (hw assignments where due date has not yet passed)
    if(this.state.showCurrentAssignments){
      var assignments = _.map(currentAssignments, function(assignment, index){
      return (
        <HomeworkAssignment 
          key={index}
          hwId={index}
          status={"./assets/smallpokeball.png"}
          title = {assignment.assignment}
          dueDate = {assignment.dueDate}
          classId = {assignment.classId} 
          assignedOn = {assignment.assignedOn}/>
       );
      });
    } //clicking on Past Assignments will change state of showCurentAssignments to false, and showPastAssignments to true 
    else if(this.state.showPastAssignments){
      var assignments = _.map(this.state.pastAssignments, function(assignment,index){
        return (
          <HomeworkAssignment
            key={index}
            hwId={index}
            status={"./assets/masterball.png"}
            title = {assignment.assignment}
            dueDate = {assignment.dueDate}
            classId = {assignment.classId} 
            assignedOn = {assignment.assignedOn}/>
        );
      });
      //shows dropdown selected month
    } else if(this.state.showMonthAssignments){
      var assignments = _.map(this.state.monthAssignments, function(assignment,index){
        return (
          <HomeworkAssignment
            key={index}
            hwId={index}
            status={"./assets/greatball.png"}
            title = {assignment.assignment}
            dueDate = {assignment.dueDate}
            classId = {assignment.classId} 
            assignedOn = {assignment.assignedOn}/>
        );
      });
    }
    return (
      <div className="homeworkDashboard">
        <Navbar loggedIn = {this.state.loggedIn}/>
        <div className="container">
        <nav className="classroomNavbar container navbar navbar-default">
            <div className="container-fluid">
              <div id="navbar" className="navbar-collapse collapsed">
                <ul className="nav navbar-nav">
                  <li>
                    <a href={url}><i className="fa fa-arrow-left"> Back to classroom</i></a>
                  </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    {(this.state.showPastAssignments || this.state.showMonthAssignments ) ? <a onClick={this.showCurrentAssignments}><i className="fa fa-pencil-square-o"><span> View Active Assignments</span></i></a> : null }
                  </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    {this.state.showCurrentAssignments ? <a onClick={this.showPastAssignments}><i className="fa fa-archive"><span> View Past Assignments</span></i></a> : null }
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <select id = "dropdown" onChange={this.monthSelect}>
            <option value="N/A">Filter by Due Date   ▾<i className="fa fa-sort-desc"></i></option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <div className="panel panel-primary">
            <div className="panel-heading">
              <h3 className="panel-title">Homework</h3>
            </div>
            <table className="table" id="homeworktable">
              <thead>
              <tr>
                <th>Assignment Name</th>
                <th>Due Date</th>
                <th>Assigned On</th>
                <th><a onClick={this.sendAssignments}>Send <i className="fa fa-paper-plane"></i></a></th>
              </tr>
              </thead>
              <tbody>{assignments}</tbody>
            </table>
          </div>
          <HomeworkForm classId={this.props.params.id}/>
          <EmailList />
        </div>
      </div>

    );
  }
});

module.exports = HomeworkDashboard;
