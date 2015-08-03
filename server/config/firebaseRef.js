var Firebase = require('firebase');
var Q = require('q');

var firebaseURI = process.env.FIREBASE_URI || require('../../config.js').firebaseURI;
var firebaseSECRET = process.env.FIREBASE_SECRET || require('../../config.js').firebaseSECRET;

var firebaseRef = new Firebase(firebaseURI)

firebaseRef.authWithCustomToken(firebaseSECRET, function(error, authData) {
  if(!error) {
    console.log('Server logged in as admin to', firebaseURI);
  } else {
    console.log(error);
  }
});

module.exports = {
  firebaseRef: firebaseRef
};
