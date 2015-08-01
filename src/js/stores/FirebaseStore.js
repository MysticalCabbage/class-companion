var Firebase = require('firebase');
var FirebaseConstants = require('../constants/FirebaseConstants');

var FirebaseStore = {};

var _store = {
	// Create a reference to the Firebase database in order to read/write database data
  db: new Firebase(FirebaseConstants.URI)
}

FirebaseStore.getDb = function(){
  return _store.db;
};

module.exports = FirebaseStore;
