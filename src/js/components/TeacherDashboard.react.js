var React = require('react');
var TeacherClass = require('./TeacherClass.react');
var TeacherActions = require('../actions/TeacherActions');
var TeacherStore = require('../stores/TeacherStore');
var TeacherForm = require('./TeacherForm.react');
var AuthStore = require('../stores/AuthStore');
var Navbar = require('./Navbar.react');
var Modal = require('react-modal');
var _ = require('underscore');

var appElement = document.app;
Modal.setAppElement(appElement);
Modal.injectCSS();

var TeacherDashboard = React.createClass({
  getInitialState: function(){
    return {
      list: TeacherStore.getList(),
      info: TeacherStore.getInfo(),
      loggedIn: AuthStore.checkAuth(),
      modalIsOpen: false 
    }
  },

  // Redirect to home page if user is not logged in
  componentWillMount: function(){
    if(!AuthStore.checkAuth()){
      this.render = function () {
        return false;
      }
      location.hash = '/';
    }
  },

  // Call the addChangeListener methods on TeacherStore and AuthStore to add event listeners
  componentDidMount: function(){
    // Query firebase for logged in user information
    var authData = AuthStore.checkAuth();
    if(authData){
      TeacherActions.initQuery(authData.uid);
    }
    TeacherStore.addChangeListener(this._onChange);
    AuthStore.addChangeListener(this._onChange);
    
  },

  // Call the removeChangeListener methods on TeacherStore and AuthStore to remove event listeners
  componentWillUnmount: function(){
    TeacherActions.endQuery();
    TeacherStore.removeChangeListener(this._onChange);
    AuthStore.removeChangeListener(this._onChange);
  },

  // Whenever data in the stores changes, fetch data from the stores and update the component states
  _onChange: function(){
    this.setState({
      list: TeacherStore.getList(),
      info: TeacherStore.getInfo(),
      loggedIn: AuthStore.checkAuth()
    })
  },

  // Open the "Add Class" modal
  openModal: function(){
    this.setState({modalIsOpen: true});
  },
  
  // Close the "Add Class modal"
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
        <Navbar loggedIn={this.state.loggedIn}/>
        <div className="container">
          <div className="row">
            {classNodes}
            <div className="teacherClass col-md-3">
              <div className="well">
                <a onClick={this.openModal}>+ Add Class</a>
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
