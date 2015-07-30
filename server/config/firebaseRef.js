var Firebase = require('firebase');
var config = require('../../config.js');

var firebaseURI = config.firebaseURI;
var firebaseRef = new Firebase(firebaseURI)

var admin = {
  email: config.firebaseAdminLogin,
  password: config.firebaseAdminPassword
};

firebaseRef.authWithPassword(admin, function onAuth(err, user){
  if (err) {
    console.log(err);
  }
  if (user) {
    console.log('Server logged into Firebase as', user.password.email);
  }
})

module.exports = {
  firebaseRef: firebaseRef
};
