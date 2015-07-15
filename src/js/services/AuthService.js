var React = require('react');
var AuthActions = require('../actions/AuthActions');
var AuthConstants = require('../constants/AuthConstants');
var Router = require('react-router');
var Link = Router.Link;
var objectAssign = require('object-assign');
var Firebase = require('firebase');
var Q = require('q');

// set ref to firebase database
var rootRef = new Firebase(AuthConstants.DB);
var teacherRef = rootRef.child('teachers');

var AuthService = {

	// firebase email/password authentication
	// returns a promise
	authWithPassword: function(userObj) {
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
	},

	// login a user
	login: function(credentials){
	  this.authWithPassword(credentials)
	    .then(function(authData) {
	      console.log('sucessfully logged in');
	      AuthActions.login(credentials, AuthService.checkAuth());
	    })
	    // .catch(function(err) {
	    //   // login fail, redirect/display
	    //   console.error(err);
	    // });
	},

	// check if a user is logged in
	// returns firebase authentication data
	checkAuth: function(){
	  return rootRef.getAuth();
	}



};

module.exports = AuthService;