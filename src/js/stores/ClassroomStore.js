var AppDispatcher = require('../dispatcher/AppDispatcher');
var ClassroomConstants = require('../constants/ClassroomConstants');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var FirebaseStore = require('./FirebaseStore');
var pokemonAPIUtils = require('../utils/PokemonWebAPIUtils')

var CHANGE_EVENT = 'change';

var firebaseRef = FirebaseStore.getDb();

var _store = {
  list: {},
  info: {},
  today: '',
  graph: []
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
  firebaseRef.child('timestamp')
    .set(Firebase.ServerValue.TIMESTAMP);

  firebaseRef.child('timestamp').once('value', function(snapshot){
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
  console.log('behavior clicked', data)
  addExperiencePoints(data)
  firebaseRef.child('classes/' + _store.info.classId + '/students/' + data.studentId + '/behavior/' + data.behaviorAction).transaction(function(current_value){ 
    return current_value + 1;
  });
  firebaseRef.child('classes/' + _store.info.classId + '/students/' + data.studentId + '/behaviorTotal/').transaction(function(current_value){
    return current_value + data.behaviorValue;
  });  
};

var behaviorChart = function(data){
  var total = data.total;
  var behaviors = data.chartData
  var chartData = [];
  for(var key in behaviors){
    newObj = {};
    if(behaviors[key] === 0){
      continue;
    } 
    newObj["label"] = key;
    newObj["value"] = Math.ceil(((behaviors[key]/total)*100) * 100)/100;
    chartData.push(newObj);
  }
  _store.graph = chartData;
  ClassroomStore.emit(CHANGE_EVENT);
};

var initQuery = function(classId){
  firebaseRef.child('classes/'+classId).on('value', function(snapshot){
    var classData = snapshot.val();
    _store.info = classData.info;
    _store.list = classData.students || {};

    //this is for grabbing behaviorTotal of all students for graphs
    var students = classData.students;
    var totalCount = 0;
    var studentsArray = [];
    var totalOfStudents = {}
    for(var student in students){
      for(var behavior in students[student]["behavior"]){
        if(totalOfStudents[behavior] === undefined) totalOfStudents[behavior] = 0;
        totalCount += students[student]["behavior"][behavior];
        totalOfStudents[behavior] += students[student]["behavior"][behavior]
      }
    }
    for(var value in totalOfStudents){
      if(totalOfStudents[value] === 0) continue;
      var newObj = {};
      newObj["label"] = value;
      newObj["value"] = Math.ceil((totalOfStudents[value]/totalCount * 100)*100)/100;
      studentsArray.push(newObj);
    }
    _store.graph = studentsArray || [];

    ClassroomStore.emit(CHANGE_EVENT);

    });



  firebaseRef.child('timestamp')
    .set(Firebase.ServerValue.TIMESTAMP);

  firebaseRef.child('timestamp').once('value', function(snapshot){
    var current_server_time = snapshot.val();
    var date = new Date(current_server_time).toLocaleDateString();
    _store.today = date.replace(/\//g, '-');

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

  getToday: function(){
    return _store.today;
  },

  getGraph: function(){
    return _store.graph;
  }
});

var getNewPokemon = function(studentId) {
  var spriteUrl;  
  var defaultPokemonProfile = {level: 1, currentExp: 1, expToNextLevel: 20}
  var pokemonDirectory = {};

  pokemonAPIUtils.getRandomPokemon().then(function(pokemonData) {
    // if there was an error and there was no pokemon data
    if (!pokemonData) {
      // eject
      return;
    }
    spriteUrl = pokemonData.sprites[0].resource_uri
    pokemonAPIUtils.getPokemonSprite(spriteUrl).then(function(pokemonSpriteData) {
      pokemonDirectory._pokemonData = pokemonData;
      pokemonDirectory._spriteData = pokemonSpriteData;
      pokemonDirectory._spriteUrl = "http://pokeapi.co" + pokemonSpriteData.image
      pokemonDirectory.profile = defaultPokemonProfile;
      sendServerPokemon(studentId, pokemonDirectory);
    })
  });
};


var sendServerPokemon = function(studentId, pokemonDirectory) {
  firebaseRef.child('classes/' 
                    + _store.info.classId 
                    + '/students/' 
                    + studentId 
                    + '/pokemon/'
                    )
                    .set(pokemonDirectory);
}

var addExperiencePoints = function(data) {
  var studentId = data.studentId
  var numberOfExperiencePointsToAdd = data.behaviorValue;
  var firebasePokemonProfileRef = firebaseRef.child('classes/' 
                            + _store.info.classId 
                            + '/students/' 
                            + studentId
                            + '/pokemon/'
                            + 'profile/'
                            )
  var profileData;
  firebasePokemonProfileRef
    .once('value', function(data){
      profileData = data.val();
      // if the pokemon needs to level up
      if (profileData.currentExp + numberOfExperiencePointsToAdd >= profileData.expToNextLevel) {
        // level up the pokemon
        handleLevelUp(firebasePokemonProfileRef, numberOfExperiencePointsToAdd)
      } 
      // else if the pokemon does not need to level up
      else {
        // increase its experience points by the specified amount
        firebasePokemonProfileRef.child('currentExp').transaction(function(current_value) {
          return current_value + numberOfExperiencePointsToAdd
        });
      }
  });

}


var handleLevelUp = function(firebasePokemonProfileRef, numberOfExperiencePointsToAdd) {

  firebasePokemonProfileRef
    .once('value', function(data){
      profileData = data.val();
      debugger;
      var accumulatedExp = profileData.currentExp + numberOfExperiencePointsToAdd 
      var numberOfTimesToLevelUp = Math.floor(accumulatedExp / profileData.expToNextLevel)
      var amountOfLeftoverExp = accumulatedExp % (profileData.expToNextLevel * numberOfTimesToLevelUp)
      firebasePokemonProfileRef.child('level').transaction(function(current_value) {
          return current_value + numberOfTimesToLevelUp
      });

      firebasePokemonProfileRef.child('currentExp').transaction(function(current_value) {
          return amountOfLeftoverExp
      });
  });

}


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
    case ClassroomConstants.GET_BEHAVIORS:
      behaviorChart(action.data);
    // Pokemon Server Actions
    case ClassroomConstants.GET_NEW_POKEMON:
      getNewPokemon(action.data)
    default:
      return true;
  }
});

module.exports = ClassroomStore;

