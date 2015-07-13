var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AuthConstants = require('../constants/AuthConstants');
var objectAssign = require('object-assign');
var Firebase = require('firebase');
var Q = require('q');

var CHANGE_EVENT = 'change';

var rootRef = new Firebase(AuthConstants.DB);

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
// create a user but not login
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
// Create a user and then login in
// returns a promise
var createUserAndLogin = function(userObj) {
  return createUser(userObj)
    .then(function () {
      return authWithPassword(userObj);
  });
};

var signup = function(credentials){
  createUserAndLogin(credentials)
    .then(function(authData) {
      console.log('succesfully signed up');//, authData);
    })
    .catch(function(err) {
      // email taken, redirect/display
      console.error(err);
    });
};

var login = function(credentials){
  authWithPassword(credentials)
    .then(function(authData) {
      console.log('sucessfully logged in');//, authData);
    })
    .catch(function(err) {
      // login fail, redirect/display
      console.error(err);
    });
};

var logout = function() {
  rootRef.unauth();
  
  if(!checkAuth()){
    console.log('sucessfully logged out');
  } else {
    console.error('Error logging out')
  }
};

var checkAuth = function(){
  return rootRef.getAuth();
};

var AuthStore = {};

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case AuthConstants.SIGNUP:
      signup(action.data);
      //authStore.signup.emit(CHANGE_EVENT);
      break;
    case AuthConstants.LOGIN:
      login(action.data);
      //authStore.login.emit(CHANGE_EVENT);
      break;
    case AuthConstants.LOGOUT:
      logout();
      //authStore.logout.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = AuthStore;
