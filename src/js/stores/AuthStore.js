var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AuthConstants = require('../constants/AuthConstants');
var objectAssign = require('object-assign');
var FirebaseStore = require('./FirebaseStore');
var Q = require('q');

var CHANGE_EVENT = 'change';

// set ref to firebase database
var firebaseRef = FirebaseStore.getDb();
var teacherRef = firebaseRef.child('teachers');

var AuthStore = objectAssign({}, EventEmitter.prototype);
AuthStore.user = null;
AuthStore._loggedIn = null;

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case AuthConstants.SIGNUP:
      AuthStore._user = action.data;
      AuthStore._loggedIn = action.loggedIn;
      this.emit('change');
      break;
    case AuthConstants.LOGIN:
      // login(action.data);
      AuthStore._user = action.data;
      AuthStore._loggedIn = action.loggedIn;
      this.emit('change');
      break;
    case AuthConstants.LOGOUT:
      AuthStore.logout();
      break;
    default:
      return true;
  }
});

// log out user
// confirms if firebase auth data was removed from local storage
AuthStore.logout = function() {
  firebaseRef.unauth();
  
  if(!AuthStore.checkAuth()){
    console.log('sucessfully logged out');
  } else {
    console.error('Error logging out')
  }
};

// check if a user is logged in
// returns firebase authentication data
AuthStore.checkAuth = function(){
  return firebaseRef.getAuth();
};


AuthStore.isLoggedIn = function() {
  return !!AuthStore._loggedIn;
};

AuthStore.addChangeListener = function(cb) {
  this.on('change', cb)
};

AuthStore.removeChangeListener = function(cb) {
  this.removeListener('change', cb);
}

module.exports = AuthStore;

