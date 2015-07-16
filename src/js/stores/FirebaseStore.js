var Firebase = require('firebase');
var FirebaseConstants = require('../constants/FirebaseConstants');

var FirebaseStore = {};

var _store = {
  db: new Firebase(FirebaseConstants.URI)
}

FirebaseStore.getDb = function(){
  return _store.db;
};

module.exports = FirebaseStore;
