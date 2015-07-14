var AppDispatcher = require('../dispatcher/AppDispatcher');
var ClassroomConstants = require('../constants/ClassroomConstants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
  list: [
    // {studentTitle: 'JD'},
    // {studentTitle: 'David'},
    // {studentTitle: 'Stacy'},
    // {studentTitle: 'Eric'},
    // {studentTitle: 'Bahia'},
    // {studentTitle: 'Shannan'},
    // {studentTitle: 'Jack'},
    // {studentTitle: 'Francois'}
  ]
};

var addStudent = function(newKid){
  console.log("adding new", newKid);
  _store.list.push({studentTitle:newKid});
};

var removeStudent = function(student){
  for(var i = 0; i<_store.list.length; i++){
    if(_store.list[i].studentTitle === student){
      _store.list.splice(i,1);
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
    default:
      return true;
  }
});

module.exports = ClassroomStore;

