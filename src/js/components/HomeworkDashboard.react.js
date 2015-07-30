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
      monthAssignments: HomeworkStore.getMonthAssignments()
    });
  },

  showPastAssignments: function(){
    this.setState({
      showPastAssignments: true,
      showCurrentAssignments: false,
      showMonthAssignments: false
    });
  },

  showCurrentAssignments: function(){
    this.setState({
      showPastAssignments: false,
      showCurrentAssignments: true,
      showMonthAssignments: false
    });
  },

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

  render: function(){
    var url = '#/classroomDashboard/' + this.props.params.id;
    var currentAssignments = {};
    var today = new Date();
    var dd = today.getDate(); 
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10){dd='0'+dd} 
    if(mm<10){mm='0'+mm} 
    var todaysDate = mm + '-' + dd;
    for(var assignment in this.state.assignments){
      if((this.state.assignments[assignment].dueDate.slice(0,5) >= todaysDate) && (yyyy <= this.state.assignments[assignment].dueDate.slice(6,10))){
          currentAssignments[assignment] = this.state.assignments[assignment];
      }
    }
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
    } else if(this.state.showPastAssignments){
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
                <option value="N/A">Filter by Due Date</option>
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
              <th><h5>Assignment Name</h5></th>
              <th><h5>Due Date</h5></th>
              <th><h5>Assigned On</h5></th>
              <th></th>
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
