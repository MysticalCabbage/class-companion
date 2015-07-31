if(process.env && process.env.TRAVIS){
  var config = require('../../config.example.js');
} else {
  var config = require('../../config.js');
}
var Firebase = require('firebase');
var Q = require('q');

var firebaseURI = config.firebaseURI;
var firebaseRef = new Firebase(firebaseURI)

var admin = {
  email: config.firebaseAdminLogin,
  password: config.firebaseAdminPassword
};

var authWithPassword = function(userObj) {
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
};

authWithPassword(admin)
  .then(function(authData){
    console.log('Server logged into Firebase as', authData.uid);
  })
  .catch(function(err){
    console.log(err);
  });


module.exports = {
  firebaseRef: firebaseRef
};
