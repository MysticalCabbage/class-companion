var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AuthConstants = require('../constants/AuthConstants');
var objectAssign = require('object-assign');
var Firebase = require('firebase');
var Q = require('q');

var CHANGE_EVENT = 'change';

// set root ref of firebase database
var rootRef = new Firebase(AuthConstants.DB);

// firebase email/password authentication
// returns a promise
var authWithPassword = function(userObj) {
  var deferred = Q.defer();
  rootRef.authWithPassword(userObj, function onAuth(err, user) {
    if (err) {
      deferred.reject(err);
    }
    if (user) {
      deferred.resolve(user);
    }
  });
  return deferred.promise;
};

// create a user but not log in
// returns a promsie
var createUser = function(userObj) {
  var deferred = Q.defer();
  rootRef.createUser(userObj, function (err) {
    if (!err) {
      deferred.resolve();
    } else {
     deferred.reject(err);
    }
  });
  return deferred.promise;
};

// create a user and then log in
// returns a promise
var createUserAndLogin = function(userObj) {
  return createUser(userObj)
    .then(function () {
      return authWithPassword(userObj);
  });
};

// sign up a user and then log in
var signup = function(credentials){
  createUserAndLogin(credentials)
    .then(function(authData) {
      console.log('succesfully signed up');
    })
    .catch(function(err) {
      console.error(err);
    });
};

// login a user
var login = function(credentials){
  authWithPassword(credentials)
    .then(function(authData) {
      console.log('sucessfully logged in');
    })
    .catch(function(err) {
      // login fail, redirect/display
      console.error(err);
    });
};

// log out user
// confirms if firebase auth data was removed from local storage
var logout = function() {
  rootRef.unauth();
  
  if(!checkAuth()){
    console.log('sucessfully logged out');
  } else {
    console.error('Error logging out')
  }
};

// check if a user is logged in
// returns firebase authentication data
var checkAuth = function(){
  return rootRef.getAuth();
};

var AuthStore = {};

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case AuthConstants.SIGNUP:
      signup(action.data);
      break;
    case AuthConstants.LOGIN:
      login(action.data);
      break;
    case AuthConstants.LOGOUT:
      logout();
      break;
    default:
      return true;
  }
});

module.exports = AuthStore;
