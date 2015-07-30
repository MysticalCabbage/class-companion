var randDate = function(){
  return 'MM-DD-YYYY';
};

var generateClassInfo = function(classId, teacherId){
  /* returns
  { 
   "info": {
      "behavior" : {
        "Bad Job" : -1,
        "Bullying" : -1,
        "Good Job" : 1,
        "Helping" : 1
      },
      "classId": classId
      "classTitle": 'Demo Class',
      "teacherId": teacherId
    }
  }
  */
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

var generateStudent = function(classId){
  /* returns
  {
    "attendance": generateAttendance();
    "behavior" : {
      "Bad Job" : 0,
      "Bullying" : 0,
      "Good Job" : 0,
      "Helping" : 0
    },
    "behaviorTotal" : 0,
    "studentTitle" : "David Hom"
  }
  */
};

var generateStudentBehavior = function(studentId){

};

var generateAttendance = function(studentId){
  var choices = ['Present', 'Late', 'Absent'];
  /* return
    { 
      'MM-DD-YYYY': choices[random]
      ...
    }
  */
};

