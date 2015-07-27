var React = require('react');
var Router = require('react-router');
var objectAssign = require('object-assign');
var AuthActions = require('../actions/AuthActions');
var FirebaseStore = require('../stores/FirebaseStore');
var Link = Router.Link;
var Q = require('q');

// set ref to firebase database
var firebaseRef = FirebaseStore.getDb();
var teacherRef = firebaseRef.child('teachers');

var AuthService = {
	// firebase email/password authentication
	// returns a promise with AuthData
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

	// login a user with email and password
	// callback when successful closes login modal
	// callback when error to stop spinner and display error message
	login: function(credentials, cb){
	  this.authWithPassword(credentials)
	    .then(function(authData) {
	      AuthActions.login(credentials, AuthService.checkAuth());
	      //cb(null, authData);
	    })
	    .catch(function(err) {
	      //console.error(err);
	      if(err){
					cb(err, null);
				} else {
					cb(null, true);
				}
	    });
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
	// callback when successful to close signup modal
	// callback when error to stop spinner and display error message
	signup: function(data, cb){
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
	      info.uid = authData.uid;
	      return AuthService.createTeacher(info);
	    }).then(function(){
	      AuthActions.signup(credentials, AuthService.checkAuth());
	    })
	    .catch(function(err) {
	      //console.error(err);
				if(err){
					cb(err, null);
				} else {
					cb(null, true);
				}
	    });
	},

	// after signing up, creates a record with info
	// info contains email, prefix, first and last name
	createTeacher: function(info){
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