var React = require('react');
var AuthActions = require('../actions/AuthActions');
var AuthConstants = require('../constants/AuthConstants');
var Router = require('react-router');
var Link = Router.Link;
var objectAssign = require('object-assign');
var FirebaseStore = require('../stores/FirebaseStore');
var Q = require('q');

// set ref to firebase database
var firebaseRef = FirebaseStore.getDb();
var teacherRef = firebaseRef.child('teachers');

var AuthService = {

	// firebase email/password authentication
	// returns a promise
	authWithPassword: function(userObj) {
	  var deferred = Q.defer();
	  firebaseRef.authWithPassword(userObj, function onAuth(err, user) {
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

	// create a user but not log in
	// returns a promsie
	createUser: function(userObj) {
	  var deferred = Q.defer();
	  firebaseRef.createUser(userObj, function (err) {
	    if (!err) {
	      deferred.resolve();
	    } else {
	     deferred.reject(err);
	    }
	  });
	  return deferred.promise;
	},

	// create a user and then log in
	// returns a promise
	createUserAndLogin: function(userObj) {
	  return this.createUser(userObj)
	    .then(function () {
	      return AuthService.authWithPassword(userObj);
	  });
	},

	// sign up a user and then log in
	signup: function(data){
	  var credentials = {
	    email: data.email,
	    password: data.password
	  };
	  var info = {
	    email: data.email,
	    prefix: data.prefix,
	    firstName: data.firstName,
	    lastName: data.lastName
	  };
	  this.createUserAndLogin(credentials)
	    .then(function(authData) {
	      console.log('succesfully signed up');
	      info.uid = authData.uid;
	      AuthActions.login(credentials, AuthService.checkAuth());
	      return this.createTeacher(info);
	    })
	    // .catch(function(err) {
	    //   console.error(err);
	    // });
	},

	createTeacher: function(info){
	  console.log('new Teacher: ', info.uid);
	  var deferred = new Q.defer();

	  teacherRef.child(info.uid).set({info: info}, function(err){
	    if(err) {
	      deferred.reject(err);
	    } else {
	      deferred.resolve();
	    }
	  });

	  return deferred.promise;
	},

	// log out user
	// confirms if firebase auth data was removed from local storage
	logout: function() {
		AuthActions.logout();
	},

	// check if a user is logged in
	// returns firebase authentication data
	checkAuth: function(){
	  return firebaseRef.getAuth();
	}

};

module.exports = AuthService;