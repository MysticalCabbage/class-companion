var AppDispatcher = require('../dispatcher/AppDispatcher');
var ClassroomConstants = require('../constants/ClassroomConstants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
  list: []
};

var addStudent = function(newKid){
  _store.list.push({studentTitle:newKid, behavior: 0});
  console.log("store has", _store.list);
};

var removeStudent = function(student){
  for(var i = 0; i<_store.list.length; i++){
    if(_store.list[i].studentTitle === student){
      _store.list.splice(i,1);
    }
  }
};

var subtractPoint = function(student){
  console.log("SUB",student);
  for(var i = 0; i<_store.list.length; i++){
    if(_store.list[i].studentTitle === student){
      _store.list[i].behavior--;
    }
  }
};

var addPoint = function(student){
  console.log("ADD",student);
  for(var i = 0; i<_store.list.length; i++){
    if(_store.list[i].studentTitle === student){
      _store.list[i].behavior++;
    }
  }
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

    default:
      return true;
  }
});

module.exports = ClassroomStore;

