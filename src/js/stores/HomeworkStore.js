var AppDispatcher = require('../dispatcher/AppDispatcher');
var HomeworkConstants = require('../constants/HomeworkConstants');
var FirebaseStore = require('./FirebaseStore');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('object-assign');
var firebaseRef = FirebaseStore.getDb();

var _store = {

};

var HomeworkStore = objectAssign({}, EventEmitter.prototype, {
  // Invoke the callback function (ie. the _onChange function in TeacherDashboard) whenever it hears a change event
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){

    default:
      return true;
  }
});

module.exports = HomeworkStore;
