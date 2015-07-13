var AppDispatcher = require('../dispatcher/AppDispatcher');
var TeacherConstants = require('../constants/TeacherConstants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _store = {
  list: [
    {classTitle: 'Math'},
    {classTitle: 'English'},
    {classTitle: 'Science'},
    {classTitle: 'History'},
    {classTitle: 'Biology'},
    {classTitle: 'Chemistry'},
    {classTitle: 'Geography'},
    {classTitle: 'Spanish'}
  ]
};

var addClass = function(newClass){
  _store.list.push(newClass);
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
