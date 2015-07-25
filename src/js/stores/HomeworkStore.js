var AppDispatcher = require('../dispatcher/AppDispatcher');
var HomeworkConstants = require('../constants/HomeworkConstants');
var FirebaseStore = require('./FirebaseStore');
var EventEmitter = require('events').EventEmitter;
var objectAssign = require('object-assign');
var FirebaseStore = require('./FirebaseStore');

var CHANGE_EVENT = 'change';

var firebaseRef = FirebaseStore.getDb();

var _store = {
  list: {},
  info: {}
};

// var initQuery = function()

var addAssignment = function(assignment){
  console.log(assignment);
  var hwId = firebaseRef.child('classes/' + assignment.classId + '/assignments').push(assignment).key();
    console.log("hwid",hwId)

  firebaseRef.child('classes/' + assignment.classId + '/homeworkFor/' + assignment.dueDate + '/' + hwId).set(hwId);

};

var HomeworkStore = objectAssign({}, EventEmitter.prototype, {
  // Invoke the callback function (ie. the _onChange function in TeacherDashboard) whenever it hears a change event
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  }
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case HomeworkConstants.ADD_ASSIGNMENT:
      addAssignment(action.data);
      HomeworkStore.emit(CHANGE_EVENT);
    default:
      return true;
  }
});

module.exports = HomeworkStore;
