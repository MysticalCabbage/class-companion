var Firebase = require('firebase');
var FirebaseConstants = require('../constants/FirebaseConstants');

var FirebaseStore = {};

FirebaseStore.db = new Firebase(FirebaseConstants.URI);

module.exports = FirebaseStore;
