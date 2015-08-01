var firebaseRef = require('../config/firebaseRef').firebaseRef;
var _ = require('underscore');
var moment = require('moment');
var starterPokemons = require('./starters').starters;

// @params count generate count many days including today
// returns array of date strings in format of M-D-YYYY
var generateDates = function(count){
  var dateFormat = 'M-D-YYYY';
  var today = moment();
  var dates = [today.format(dateFormat)];
  var step = count > 0 ? 1 : -1;
  var date;

  if(count > 0) {
    for(var i = 1; i < count; i++){
      date = today.add(step, 'days');
      dates.push(date.format(dateFormat));
    }
  } else if(count < 0) {
    for(var i = -1; i > count; i--){
      date = today.add(step, 'days');
      dates.unshift(date.format(dateFormat));
    }
  }

  return dates;
};

// generate random int between min and max
var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// @params teacherId firebase userid of teacher
// returns class info
var ClassInfo = function(teacherId){
  this.behavior = {
    "Bad Job" : -1,
    "Bullying" : -1,
    "Good Job" : 1,
    "Helping" : 1
  };
  this.classTitle = 'Demo Class';
  this.teacherId = teacherId;
};

// Assignment constructor
var Assignment = function(classId, assignDate, dueDate, assignment){
  this.assignedOn = assignDate;
  this.assignment =  assignment;
  this.classId = classId;
  this.dueDate = dueDate;
  var date = assignDate.split('-');
  this.monthYear = [date[0], date[2]];
};

// @param classId firebase object id of current class
// @param dates array of dates in format M-D-YYYY
// return array of assignment objects
var generateAssignments = function(classId, dates){
  var assignments = [];

  for(var i = 0; i < dates.length - 1; i++){
    var assignDate = moment(dates[i], 'M-D-YYYY').format('MM-DD-YYYY');
    var dueDate = moment(dates[i+1], 'M-D-YYYY').format('MM-DD-YYYY');

    assignments.push(new Assignment(classId, assignDate, dueDate, 'HW'+i));
  }

  return assignments;
};

// returns an array with student objects
// each student object has the studentTitle and a pokemon
var generateStudents = function(){
  var students = [
    {studentTitle: 'Jonathan Davis'},
    {studentTitle: 'Stacy Huang'},
    {studentTitle: 'Eric Kao'},
    {studentTitle: 'David Hom'}
  ];

  // shuffle students to get different order each time
  var idx = 0;
  var shuffledStudents = [];
  var shuffledPokemons = [];

  var toShuffle = students.slice();

  while(toShuffle.length){
    idx = Math.floor(Math.random() * toShuffle.length)
    shuffledStudents.push(toShuffle.splice(idx,1)[0]);
  }

  // shuffle pokemons give each student a different pokemon
  var toShuffle = starterPokemons.slice();

  while(toShuffle.length){
    idx = Math.floor(Math.random() * toShuffle.length)
    shuffledPokemons.push(toShuffle.splice(idx,1)[0]);
  }

  // attach pokemon to each student
  _.each(shuffledStudents, function(student, index){
    shuffledStudents[index].pokemon = shuffledPokemons[index];
  });

  return shuffledStudents;
};

// @params dates array of date string with format M-D-YYYY
// biased to choose Present
var generateAttendance = function(dates){
  var choices = ['Present', 'Present',
                 'Late', 'Present',
                 'Absent', 'Present',
                 'Present', 'Present' ];
  var attendance = {};

  _.each(dates, function(date){
    attendance[date] = choices[Math.floor(Math.random()*choices.length)];
  });

  return attendance;
};

// returns an object with default behavior points
var defaultBehavior = function(){
  return {
    "Bad Job": 0,
    "Bullying": 0,
    "Good Job": 0,
    "Helping": 0
  };
};

// @params dates array of dates with format M-D-YYYY
// returns an object with:
// behaviorHistory - object of dates and behaviors of that day
// behavior - total count of each behavior
// behaviorTotal - total behavior points
var generateBehavior = function(dates){
  var behaviorDailyTotal = 0;

  var behavior = defaultBehavior();
  var behaviorHistory = {};
  var behaviorTotal = 0;

  _.each(dates, function(date){

    behaviorHistory[date] = {behaviors:{}};

    behaviorHistory[date].behaviors["Bad Job"] = getRandomInt(-1, 0);
    behaviorHistory[date].behaviors["Bullying"] = getRandomInt(-1, 0);
    behaviorHistory[date].behaviors["Good Job"] = getRandomInt(0, 5);
    behaviorHistory[date].behaviors["Helping"] = getRandomInt(0, 5);

    behaviorDailyTotal = _.reduce(behaviorHistory[date].behaviors, function(acc, cur, index){
      behavior[index] += Math.abs(cur);
      return acc + cur;
    }, 0);

    behaviorHistory[date].behaviorDailyTotal = behaviorDailyTotal;
    behaviorTotal += behaviorDailyTotal;

  });


  return {
    behaviorHistory: behaviorHistory,
    behavior: behavior,
    behaviorTotal: behaviorTotal
  };
};

var demoUtils = {
  // @params teacherId user Id to generate demoClass for
  generateDemo: function(teacherId){
    // create a set of Demo class object
    var demoClassObj = new ClassInfo(teacherId);

    // add demo class to teacher
    var demoClassId = firebaseRef.child(
      '/teachers/'
      + teacherId
      + '/classes'
    ).push(demoClassObj).key();

    // attach classId to demo class info
    demoClassObj.classId = demoClassId;

    // set isDemo to true
    demoClassObj.isDemo = true;

    // add demo class to class record
    firebaseRef.child(
      'classes/'
      + demoClassId
      + '/info'
    ).set(demoClassObj);

    // generate 2 sets of 5 consecutive dates
    // nextDates for assigning homework
    var nextDates = generateDates(5);
    // prevDates for setting behaviors and attendance
    var prevDates = generateDates(-35);

    // generate 4 studentTitle
    var students = generateStudents();

    _.each(students, function(studentObj){
      // generate student Object Id
      var studentId = firebaseRef.child(
        'classes/'
        + demoClassId
        + '/student'
      ).push().key();

      // generate attendance for prevDates
      studentObj.attendance = generateAttendance(prevDates);

      // generate random behaviors
      var randomBehavior = generateBehavior(prevDates);
      studentObj.behavior = randomBehavior.behavior;
      studentObj.behaviorHistory = randomBehavior.behaviorHistory;
      studentObj.behaviorTotal = randomBehavior.behaviorTotal;

      // set pokemon exp and level
      var exp = randomBehavior.behavior["Good Job"] + randomBehavior.behavior["Helping"];

      studentObj.pokemon.profile.currentExp = exp % 20;
      studentObj.pokemon.profile.level = Math.floor(exp/20);

      // add student obj to firebase class students list
      firebaseRef.child(
        'classes/'
        + demoClassId
        + '/students/'
        + studentId
      ).set(studentObj);

      // add student to firebase class group list
      firebaseRef.child(
        'classes/'
        + demoClassId
        + '/groups/'
        + studentId
      ).set(1);

      // generates an array of assignment objects
      var assignments = generateAssignments(demoClassId, prevDates.slice(25).concat(nextDates));

      // sort assignment by assigned date
      assignments.sort(function(a,b){
          return moment(a.assignedOn, 'MM-DD-YYYY') > moment(b.assignedOn, 'MM-DD-YYYY');
        });

      // add each assignment to firebase
      _.each(assignments, function(assignment){
        firebaseRef.child(
          'classes/'
          + demoClassId
          + '/assignments/'
          + assignment.assignment
        ).set(assignment);
      });

    });
  }
};

module.exports = demoUtils;
