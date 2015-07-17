var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AuthConstants = require('../constants/AuthConstants');
var objectAssign = require('object-assign');
var FirebaseStore = require('./FirebaseStore');
var Q = require('q');
var RouterContainer = require('../services/RouterContainer');

var CHANGE_EVENT = 'change';

// set ref to firebase database
var firebaseRef = FirebaseStore.getDb();
var teacherRef = firebaseRef.child('teachers');

var _user = null;
var _loggedIn = null;

var redirect = function(){
  if (_loggedIn) {
    var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/TeacherDashboard';
    RouterContainer.get().transitionTo(nextPath);
  }
}

var AuthStore = objectAssign({}, EventEmitter.prototype, {
  loggedIn: function(){
    return _loggedIn;
  },

  // log out user
  // confirms if firebase auth data was removed from local storage
  logout: function() {
    firebaseRef.unauth();
    
    if(!this.checkAuth()){
      console.log('sucessfully logged out');
    } else {
      console.error('Error logging out')
    }
  },

  // check if a user is logged in
  // returns firebase authentication data
  checkAuth: function(){
    return firebaseRef.getAuth();
  },

  isLoggedIn: function() {
    return !!_loggedIn;
  },

  addChangeListener: function(cb) {
    this.on('change', cb)
  },

  removeChangeListener: function(cb) {
    this.removeListener('change', cb);
  }
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case AuthConstants.SIGNUP:
      _user = action.data;
      _loggedIn = action.loggedIn;
      redirect();
      this.emit('change');
      break;
    case AuthConstants.LOGIN:
      // login(action.data);
      _user = action.data;
      _loggedIn = action.loggedIn;
      redirect();
      this.emit('change');
      break;
    case AuthConstants.LOGOUT:
      AuthStore.logout();
      RouterContainer.get().transitionTo('/login');
      break;
    default:
      return true;
  }
});

module.exports = AuthStore;

