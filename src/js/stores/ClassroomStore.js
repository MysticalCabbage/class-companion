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
  firebaseRef.child('classes/' + _store.info.classId + '/students').push(newStudent);
};

var removeStudent = function(studentId){
  firebaseRef.child('classes/' + _store.info.classId + '/students/' + studentId).remove();
};

var subtractPoint = function(data){
  firebaseRef.child('classes/' + _store.info.classId + '/students/' + data.studentId + '/behavior').set(data.behavior-1);
};

var markAttendance = function(data){
  // Recored the current timestamp based don the Firebase server
  firebaseRef.child('classes/' + _store.info.classId + '/students/' + data.studentId + '/attendance')
    .set(Firebase.ServerValue.TIMESTAMP);

  // Listens for when the attendance data gets stored
  firebaseRef.child('classes/' + _store.info.classId + '/students/' + data.studentId + '/attendance').once('value', function(snapshot){
    // Grab the timestamp stored in the database
    var current_server_time = snapshot.val();
    // Converts the timestamp into a readable string, using locale conventions (eg. 7/17/2015)
    var date = new Date(current_server_time).toLocaleDateString();
    // Replace '/' with '-' so the database recognize date as one string and sets it as the param 
    var newDate = date.replace(/\//g, '-');
    // Store student attendance for that date
    firebaseRef.child('classes/' + _store.info.classId + '/students/' + data.studentId + '/attendance/' + newDate)
      .set(data.attendance);
  });
};

var behaviorClicked = function(data){
  firebaseRef.child('classes/' + _store.info.classId + '/students/' + data.studentId + '/behavior/' + data.behaviorAction).transaction(function(current_value){ 
    return current_value + 1;
  });
  firebaseRef.child('classes/' + _store.info.classId + '/students/' + data.studentId + '/behaviorTotal/').transaction(function(current_value){
    return current_value + data.behaviorValue;
  });  
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
  },

  getAttendance: function(){
    return _store.attendance;
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
    case ClassroomConstants.BEHAVIOR_CLICKED:
      behaviorClicked(action.data);
      ClassroomStore.emit(CHANGE_EVENT);
      break;
    case ClassroomConstants.MARK_ATTENDANCE:
      markAttendance(action.data);
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

