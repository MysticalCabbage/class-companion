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
  assignments: {},
  homeworkFor : {}
};

// var initQuery = function()

var addAssignment = function(assignment){
  console.log(assignment);
  var hwId = firebaseRef.child('classes/' + assignment.classId + '/assignments').push(assignment).key();

  firebaseRef.child('classes/' + assignment.classId + '/homeworkFor/' + assignment.dueDate + '/' + hwId).set(hwId);
  console.log(assignment);
};

var initQuery = function(classId){
  firebaseRef.child('classes/' + classId).on('value', function(snapshot){
    var classData = snapshot.val();
    _store.info = classData.info;
    _store.assignments = classData.assignments;
    _store.homeworkFor = classData.homeworkFor;
  });
  HomeworkStore.emit(CHANGE_EVENT);
};

var endQuery = function(){
  firebaseRef.child('classes/'+_store.info.classId).off();
};

var removeAssignment = function(hwId){
  firebaseRef.child('classes/' + _store.info.classId + '/assignments/' + hwId ).remove();
};

var HomeworkStore = objectAssign({}, EventEmitter.prototype, {
  // Invoke the callback function (ie. the _onChange function in TeacherDashboard) whenever it hears a change event
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },

  getInfo: function(){
    return _store.info;
  },
  getAssignments: function(){
    return _store.assignments;
  },
  getList: function(){
    return _store.list;
  },
  getHomeworkFor: function(){
    return _store.homeworkFor;
  }
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case HomeworkConstants.ADD_ASSIGNMENT:
      addAssignment(action.data);
      HomeworkStore.emit(CHANGE_EVENT);
      break;
    case HomeworkConstants.INIT_QUERY:
      initQuery(action.data);
      HomeworkStore.emit(CHANGE_EVENT);
      break;
    case HomeworkConstants.END_QUERY:
      endQuery();
      HomeworkStore.emit(CHANGE_EVENT);
      break;
    case HomeworkConstants.REMOVE_ASSIGNMENT:
      removeAssignment(action.data);
      HomeworkStore.emit(CHANGE_EVENT);
    default:
      return true;
  }
});

module.exports = HomeworkStore;
