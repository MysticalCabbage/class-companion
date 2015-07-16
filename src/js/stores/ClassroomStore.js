var AppDispatcher = require('../dispatcher/AppDispatcher');
var ClassroomConstants = require('../constants/ClassroomConstants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var FirebaseStore = require('./FirebaseStore');

var CHANGE_EVENT = 'change';

var firebaseRef = FirebaseStore.getDb();

var _store = {
  list: []
};

var addStudent = function(newKid){

};

var removeStudent = function(student){

};

var subtractPoint = function(student){

};

var addPoint = function(student){

};

var initQuery = function(classId){

};

var endQuery = function(){

};

var ClassroomStore = objectAssign({}, EventEmitter.prototype, {
  // Invoke the callback function (ie. the _onChange function in TeacherDashboard) whenever it hears a change event
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },

  getList: function(){
    return _store.list;
  },
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case ClassroomConstants.ADD_STUDENT:
      // invoke setter function above to add new student to the list
      addStudent(action.data);
      // Emit a change event
      ClassroomStore.emit(CHANGE_EVENT);
      break;
    case ClassroomConstants.REMOVE_STUDENT:
      removeStudent(action.data);
      ClassroomStore.emit(CHANGE_EVENT);
      break;
    case ClassroomConstants.ADD_POINT:
      addPoint(action.data);
      ClassroomStore.emit(CHANGE_EVENT);
      break;
    case ClassroomConstants.SUBTRACT_POINT:
      subtractPoint(action.data);
      ClassroomStore.emit(CHANGE_EVENT);
      break;
    case ClassroomConstants.INIT_QUERY:
      initQuery(action.data);
      break;
    case ClassroomConstants.END_QUERY:
      endQuery();
      ClassroomStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = ClassroomStore;

