var AppDispatcher = require('../dispatcher/AppDispatcher');
var TeacherConstants = require('../constants/TeacherConstants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var FirebaseStore = require('./FirebaseStore');

var CHANGE_EVENT = 'change';

var _store = {
  teacher_id: FirebaseStore.db.getAuth().uid,
  list: {}
};

var addClass = function(newClass){
  var newClassId = FirebaseStore.db.child('classes').push().key();
  FirebaseStore.db.child('teachers/' + _store.teacher_id + '/classes/' + newClassId).set(newClassId);
  FirebaseStore.db.child('classes/' + newClassId + '/class_info').set({classTitle: newClass, teacher_id: _store.teacher_id);
};

var TeacherStore = objectAssign({}, EventEmitter.prototype, {
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

  dbOn: function(){
    console.log(FirebaseStore.db.getAuth().uid === _store.teacher_id);
    // get teacher info, your id stored in rootRef.getAuth().uid
    FirebaseStore.db.child(_store.teacher_id + '/info').on('value', function(snapshot){
      console.log(snapshot.val()); // get entire teacher info back
    });


    // get all classes, store class id, set current class id
    FirebaseStore.db.child(_store.teacher_id + '/classes').on('value', function(snapshot){
      console.log(snapshot.val()); // retrieves all classes
      // compare with current class list and add to state list
    });
  },

  dbOff: function(){
    console.log(FirebaseStore.db.getAuth().uid === _store.teacher_id);
    FirebaseStore.db.child(_store.teacher_id + '/info').off();
    FirebaseStore.db.child(_store.teacher_id + '/classes').off();
  }
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case TeacherConstants.ADD_CLASS:
      // inboke the addClass setter function above to add new class to the list
      addClass(action.data);
      // Emit a change event
      TeacherStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = TeacherStore;

