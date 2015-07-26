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
  info: {},
  assignments: {}
};

// var initQuery = function()

var addAssignment = function(assignment){
  console.log(assignment);
  var hwId = firebaseRef.child('classes/' + assignment.classId + '/assignments').push(assignment).key();
    console.log("hwid",hwId)

  firebaseRef.child('classes/' + assignment.classId + '/homeworkFor/' + assignment.dueDate + '/' + hwId).set(hwId);
};

var initQuery = function(classId){
  firebaseRef.child('classes/' + classId).on('value', function(snapshot){
    var classData = snapshot.val();
    _store.info = classData.info || {};
    _store.list = classData.list || {};
    _store.assignments = classData.assignments || {};
  });
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
    case HomeworkConstants.INIT_QUERY:
      initQuery(action.data);
      HomeworkStore.emit(CHANGE_EVENT);
    default:
      return true;
  }
});

module.exports = HomeworkStore;
