var ClassroomConstants = require('../constants/ClassroomConstants');
var ClassroomStore = require('./ClassroomStore');
var AppDispatcher = require('../dispatcher/AppDispatcher');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var _ = require('underscore');
var FirebaseStore = require('./FirebaseStore');

var CHANGE_EVENT = 'change';

// Retrieve Firebase root reference from FirebaseStore
var firebaseRef = FirebaseStore.getDb();

var _store = {
  random: null,
  groups: []
};

// Runs when ClassroomDashboard is mounted
// Queries and listen to Firebase for changes in classes/<classId>/selection/currentSelection
var initQuery = function(classId){
  var first = true;
  firebaseRef.child('classes/'+classId+'/selection/currentSelection').on('value', function(snapshot){
    // ignore null when ClassroomDashboard first mounts
    // ignore previous selected value when page refreshes
    if(first){
      first = false;
    } else {
      _store.random = snapshot.val();
      StudentSelectionStore.emit(CHANGE_EVENT);
    }
  });
}

// Runs when ClassroomDashboard is umounted
// Ends Firebase listener to /classes/<classId>/selection/currentSelection
var endQuery = function(){
  var classId = ClassroomStore.getInfo().classId;
  // if classId is undefined for some reason, exit
  if(!classId){
    return;
  }
  // Delete Selected student from database
  firebaseRef.child('classes/'+classId+'/selection/currentSelection').set(null);
  firebaseRef.child('classes/'+classId+'/selection/currentSelection').off();
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
  var classId = ClassroomStore.getInfo().classId;
  firebaseRef.child('classes/'+classId+'/selection/currentSelection').set(random);
};

// Select and place students into groups randomly
// shuffles list of students
// group adjacent students into groups of 2
var randGroup = function(groupSize){
  var students = ClassroomStore.getList();
  var keys = Object.keys(students);
  var shuffled = [], idx = 0;

  while(keys.length){
    idx = Math.floor(Math.random() * keys.length)
    shuffled.push(keys.splice(idx,1)[0]);
  }

  var bucketSize = groupSize;
  console.log(bucketSize)
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
  console.log(_store.groups)
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
      randGroup(action.data);
      break;
    case ClassroomConstants.INIT_QUERY:
      initQuery(action.data);
      break;
    case ClassroomConstants.END_SELECT_QUERY:
      endQuery();
      break;
    default:
      return true;
  }
});
