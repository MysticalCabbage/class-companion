var AppDispatcher = require('../dispatcher/AppDispatcher');
var TeacherConstants = require('../constants/TeacherConstants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
  list: {},
  info: {}
};

var addClass = function(newClass){
  _store.list[newClass.classTitle] = newClass
};

var removeClass = function(classTitle){
  delete _store.list[classTitle];
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
  getInfo: function(){
    return _store.info;
  },
});

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case TeacherConstants.ADD_CLASS:
      // invoke the addClass setter function above to add new class to the list
      addClass(action.data);
      // Emit a change event
      TeacherStore.emit(CHANGE_EVENT);
    case TeacherConstants.REMOVE_CLASS:
      removeClass(action.data);
      TeacherStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});

module.exports = TeacherStore;

