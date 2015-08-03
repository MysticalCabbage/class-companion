if(process.env && process.env.TRAVIS){
  var config = require('../../config.example.js');
} else {
  var config = require('../../config.js');
}
var Firebase = require('firebase');
var Q = require('q');

var firebaseURI = config.firebaseURI;
var firebaseRef = new Firebase(firebaseURI)


firebaseRef.authWithCustomToken(config.firebaseSECRET, function(error, authData) {
  if(!error) {
    console.log(authData);
  } else {
    console.log(error);
  }
});

module.exports = {
  firebaseRef: firebaseRef
};
