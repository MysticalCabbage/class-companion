var firebaseRef = require('../config/firebaseRef').firebaseRef;
var _ = require('underscore');
var moment = require('moment');

// @params count generate count many days including today
// returns array of date strings in format of MM-DD-YYYY
var generateDates = function(count){
  var dateFormat = 'M-DD-YYYY';
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

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var generateClassInfo = function(teacherId){
  return {
    "behavior" : {
      "Bad Job" : -1,
      "Bullying" : -1,
      "Good Job" : 1,
      "Helping" : 1
    },
    "classTitle": 'Demo Class',
    "teacherId": teacherId
  }
};

var generateAssignment = function(classId){
  var date = randDate();
  /* returns
  {
    "assignedOn" : date,
    "assignment" : "hw1",
    "classId" : classId,
    "dueDate" : date+something
    "monthYear" : [ date year, date month ]
  }
  */
};

var defaultBehaviorPoints = function(){
  return {
    "Bad Job": 0,
    "Bullying": 0,
    "Good Job": 0,
    "Helping": 0
  };
};

var generateStudents = function(){
  return [
    'Jonathan Davis',
    'Stacy Huang',
    'Eric Kao',
    'David Hom'
  ];
};

var generateRandomHistory = function(date) {
  var randomBehaviorHistory = {};
  var behaviorSum;

  randomBehaviorHistory[date] = {behaviors: {}};
  randomBehaviorHistory[date].behaviors["Bad Job"] = getRandomInt(-30, 0);
  randomBehaviorHistory[date].behaviors["Bullying"] = getRandomInt(-30, 0);
  randomBehaviorHistory[date].behaviors["Good Job"] = getRandomInt(0, 30);
  randomBehaviorHistory[date].behaviors["Helping"] = getRandomInt(0, 30);

  behaviorSum = _.reduce(randomBehaviorHistory[date].behaviors, function(memo, num) {return memo+num});

  randomBehaviorHistory[date].behaviorDailyTotal = {behaviorSum: behaviorSum};

  return randomBehaviorHistory;
};

// @params dates array of date string in MM-DD-YYYY format
var generateAttendance = function(dates){
  var choices = ['Present', 'Late', 'Absent'];
  var attendance = {};

  _.each(dates, function(date){
    attendance[date] = choices[Math.floor(Math.random()*3)];
  });

  return attendance;
};


var demoUtils = {
  generateDemo: function(teacherId){
    // create a set of Demo class object
    var demoClassObj = generateClassInfo(teacherId);

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
    var tomorrowDates = generateDates(5);
    var yesterdayDates = generateDates(-5);

    // generate 4 studentTitle
    var students = generateStudents();

    for(var i = 0; i < students.length; i++){
      var studentObj = {};

      // generate student Object Id
      var studentId = firebaseRef.child(
        'classes/'
        + demoClassId
        + '/student'
      ).push().key();

      // generate attendance for yesterdayDates
      studentObj.attendance = generateAttendance(yesterdayDates);

      // attach student name as studentTitle
      studentObj.studentTitle = students[i];

      // default behavior points to 0
      studentObj.behavior = defaultBehaviorPoints();
      studentObj.behaviorTotal = 0;

      firebaseRef.child(
        'classes/'
        + demoClassId
        + '/students/'
        + studentId
      ).set(studentObj);

      firebaseRef.child(
        'classes/'
        + demoClassId
        + '/groups/'
        + studentId
      ).set(1);
    }
  }
};

module.exports = demoUtils;
