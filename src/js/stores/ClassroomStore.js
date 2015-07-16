var AppDispatcher = require('../dispatcher/AppDispatcher');
var ClassroomConstants = require('../constants/ClassroomConstants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var FirebaseStore = require('./FirebaseStore');

var CHANGE_EVENT = 'change';

var firebaseRef = FirebaseStore.getDb();

var _store = {
  list: {},
  info: {}
};

var addStudent = function(newStudent){
  firebaseRef.child('classes/' + _store.info.classId + '/students').push({studentTitle: newStudent, behavior: 0});
};

var removeStudent = function(studentId){

};

var subtractPoint = function(data){
  firebaseRef.child('classes/' + _store.info.classId + '/students/' + data.studentId).set({behavior: data.behavior-1});
};

var addPoint = function(data){
  firebaseRef.child('classes/' + _store.info.classId + '/students/' + data.studentId).set({behavior: data.behavior+1});
};

var initQuery = function(classId){
  firebaseRef.child('classes/'+classId).on('value', function(snapshot){
    var classData = snapshot.val();
    _store.info = classData.info;
    _store.list = classData.students || {};
    ClassroomStore.emit(CHANGE_EVENT);
  });
};

var endQuery = function(){
  firebaseRef.child('classes/'+_store.info.classId).off();
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

  getInfo: function(){
    return _store.info;
  }
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

