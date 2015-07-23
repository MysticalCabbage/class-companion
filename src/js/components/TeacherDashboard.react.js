var React = require('react');
var TeacherClass = require('./TeacherClass.react');
var TeacherActions = require('../actions/TeacherActions');
var TeacherStore = require('../stores/TeacherStore');
var TeacherForm = require('./TeacherForm.react');
var AuthStore = require('../stores/AuthStore');
var Navbar = require('./Navbar.react');
var Router = require('react-router');
var Modal = require('react-modal');
var Link = Router.Link;
var _ = require('underscore');

var appElement = document.app;
Modal.setAppElement(appElement);
Modal.injectCSS();

var TeacherDashboard = React.createClass({
  // Invoke TeacherStore.getList() and set the result to the list property on our state
  getInitialState: function(){
    return {
      list: TeacherStore.getList(),
      info: TeacherStore.getInfo(),
      loggedIn: AuthStore.checkAuth(),
      modalIsOpen: false 
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

  // Call the addChangeListener method on TeacherStore to add an event listener
  componentDidMount: function(){
    // query firebase for logged in user information
    var authData = AuthStore.checkAuth();
    if(authData){
      TeacherActions.initQuery(authData.uid);
    }
    TeacherStore.addChangeListener(this._onChange);
    AuthStore.addChangeListener(this._onChange);
    
  },

  // Call the removeChangeListener method on TeacherStore to remove an event listener
  componentWillUnmount: function(){
    TeacherActions.endQuery();
    TeacherStore.removeChangeListener(this._onChange);
    AuthStore.removeChangeListener(this._onChange);
  },

  // Whenever data in the store changes, fetch data from the store and update the component state
  _onChange: function(){
    this.setState({
      list: TeacherStore.getList(),
      info: TeacherStore.getInfo(),
      loggedIn: AuthStore.checkAuth()
    })
  },

  openModal: function(){
    this.setState({modalIsOpen: true});
  },
  
  closeModal: function() {
    this.setState({modalIsOpen: false});
  },

  render: function() {
    var classNodes = _.map(this.state.list, function(classNode, index){
      return (
        <TeacherClass key={index} classId={index} classTitle={classNode.classTitle}/>
      )
    });

    return (
      <div className="teacherDashboard">
        <Navbar loggedIn = {this.state.loggedIn}/>
        <div className="container">
          <div className="row">
            {classNodes}
            <div className="teacherClass col-md-3">
              <div className="well">
                 <a onClick={this.openModal}>Add Class</a>
              </div>
            </div>
            <Modal className="teacherModal" isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
              <TeacherForm closeModal={this.closeModal}/>
            </Modal>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = TeacherDashboard;
