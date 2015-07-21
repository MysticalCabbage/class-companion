var AppDispatcher = require('../dispatcher/AppDispatcher');
var AttendanceConstants = require('../constants/AttendanceConstants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var FirebaseStore = require('./FirebaseStore');

var CHANGE_EVENT = 'change';

var firebaseRef = FirebaseStore.getDb();

var _store = {
  list: {},
  info: {}
};

var initQuery = function(classId){
  firebaseRef.child('classes/'+classId).on('value', function(snapshot){
    var classData = snapshot.val();
    _store.info = classData.info;
    _store.list = classData.students || {};
    AttendanceStore.emit(CHANGE_EVENT);
  });
};

var endQuery = function(){
  firebaseRef.child('classes/'+_store.info.classId).off();
};

var AttendanceStore = objectAssign({}, EventEmitter.prototype, {
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

});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case AttendanceConstants.INIT_QUERY:
      initQuery(action.data);
      break;
    case AttendanceConstants.END_QUERY:
      endQuery();
      AttendanceStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = AttendanceStore;

