var ClassroomConstants = require('../constants/ClassroomConstants');
var ClassroomStore = require('./ClassroomStore');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');

var CHANGE_EVENT = 'change';

var _store = {
  random: '',
  groups: []
};

var randStudent = function(){
  var students = ClassroomStore.getList();
  var random = prevRandom = _store.random;
  var loop = 0;
  while(random === prevRandom){
    // in case ever an infinite loop
    if(loop >= 100){ break; }
    var count = 0;
    for(var student in students){
      if(Math.random() < 1/++count){
        random = students[student];
      }
    }
    loop++;
  }
  _store.random = random;
};

var randGroup = function(){
  var students = ClassroomStore.getList();
  var keys = Object.keys(students);
  var shuffled = [], idx = 0;
  while(keys.length){
    idx = Math.floor(Math.random() * keys.length)
    shuffled.push(keys.splice(idx,1)[0]);
  }
  var bucketSize = 2;
  var bucket = [];
  var groups = [];

  var count = 0;
  _.each(shuffled, function(key){
    count++;
    bucket.push(students[key])
    if(count%bucketSize === 0){
      groups.push(bucket.slice());
      bucket = [];
    }
  }.bind(this));
  
  if(bucket.length > 0){
    groups.push(bucket)
  }
  _store.groups = groups;
};

var StudentSelectionStore = objectAssign({}, EventEmitter.prototype, {
  addChangeListener: function(cb){
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb){
    this.removeListener(CHANGE_EVENT, cb);
  },
  getRandom: function(){
    return _store.random;
  },
  getGroup: function(){
    return _store.groups;
  }
});

module.exports = StudentSelectionStore;

AppDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType){
    case ClassroomConstants.RAND_STUDENT:
      randStudent();
      StudentSelectionStore.emit(CHANGE_EVENT);
      break;
    case ClassroomConstants.RAND_GROUP:
      randGroup();
      StudentSelectionStore.emit(CHANGE_EVENT);
      break;
    default:
      return true;
  }
});


