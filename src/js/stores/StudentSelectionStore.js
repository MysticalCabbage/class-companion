var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var FirebaseStore = require('./FirebaseStore');
var ClassroomStore = require('./ClassroomStore');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var ClassroomConstants = require('../constants/ClassroomConstants');
var _ = require('underscore');

var CHANGE_EVENT = 'change';

// Retrieve Firebase root reference from FirebaseStore
var firebaseRef = FirebaseStore.getDb();

var _store = {
  random: null,
  groups: [],
  classId: ''
};

// Runs when ClassroomDashboard is mounted
// Queries and listen to Firebase for changes in classes/<classId>/selection/currentSelection
var initQuery = function(classId){
  _store.classId = classId;
  
  var first = true;
  
  firebaseRef.child(
    'classes/'
    + _store.classId
    + '/selection/currentSelection'
  ).on('value', function(snapshot){
    // ignore null when ClassroomDashboard first mounts
    // ignore previous selected value when page refreshes
    if(first){
      first = false;
    } else {
      _store.random = snapshot.val();
      StudentSelectionStore.emit(CHANGE_EVENT);
    }
  });

  firebaseRef.child(
    'classes/'
    + classId
    + '/groups'
  ).on('value', function(snapshot){
    _store.groups = snapshot.val() || {};
    ClassroomStore.emit(CHANGE_EVENT);
  });
}

// Runs when ClassroomDashboard is umounted
// Ends Firebase listener to /classes/<classId>/selection/currentSelection
var endQuery = function(){
  // Delete Selected student from database
  firebaseRef.child(
    'classes/'
    + _store.classId
    + '/selection/currentSelection'
  ).set(null);
  
  // Remove listener to currentSelection in Firebase
  firebaseRef.child(
    'classes/'
    + _store.classId
    + '/selection/currentSelection'
  ).off();

  firebaseRef.child(
    'classes/'
    + _store.classId
    + '/groups'
  ).off();
}

// Selects a random student
// Random unweighted selection
// Will try 100 times to get a non repeated selection
var randStudent = function(){
  var students = ClassroomStore.getList();
  var random = prevRandom = _store.random;
  var loop = 0;

  while(random === prevRandom){
    // break infinite loop after 100 tries to get unique selection
    if(loop >= 100){ break; }
    var count = 0;
    for(var student in students){
      if(Math.random() < 1/++count){
        random = student;
      }
    }
    loop++;
  }

  // set randomly selected student's ID to Firebase
  firebaseRef.child(
    'classes/'
    + _store.classId
    + '/selection/currentSelection'
  ).set(random);
};

// Select and place students into groups randomly
// shuffles list of students
// group adjacent students into groups of 2
var randGroup = function(groupSize){
  var students = ClassroomStore.getList();
  var keys = Object.keys(students);
  var shuffled = [], idx = 0;

  var groupCount = Math.ceil(keys.length/groupSize);
  var groups = {};
  var group = 1;

  while(keys.length){
    idx = Math.floor(Math.random() * keys.length)
    shuffled.push(keys.splice(idx,1)[0]);
  }

  _.each(shuffled, function(key, index){
    groups[key] = group;
  });

  return groups;
};

var setGroup = function(groupSize){
  firebaseRef.child(
    'classes/'
    + _store.classId
    + '/groups'
  ).set(randGroup(groupSize));
};

var removeStudentFromGroups = function(studentId){
  firebaseRef.child(
    'classes/'
    + _store.classId
    + '/groups/'
    + studentId
  ).remove()
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
      break;
    case ClassroomConstants.RAND_GROUP:
      setGroup(action.data);
      break;
    case ClassroomConstants.INIT_QUERY:
      initQuery(action.data);
      break;
    case ClassroomConstants.END_SELECT_QUERY:
      endQuery();
      break;
    case ClassroomConstants.REMOVE_STUDENT:
      removeStudentFromGroups(action.data);
      break;
    default:
      return true;
  }
});
