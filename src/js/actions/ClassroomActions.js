var AppDispatcher = require('../dispatcher/AppDispatcher');
var ClassroomConstants = require('../constants/ClassroomConstants');

var ClassroomActions = {
  addStudent: function(newStudent){
    AppDispatcher.handleAction({
      actionType: ClassroomConstants.ADD_STUDENT,
      data: newStudent
    });
  },
  removeStudent: function(studentId){
    AppDispatcher.handleAction({
      actionType: ClassroomConstants.REMOVE_STUDENT,
      data: studentId
    });
  },
  behaviorClicked: function(studentId, index, points){
    AppDispatcher.handleAction({
      actionType: ClassroomConstants.BEHAVIOR_CLICKED,
      data: {studentId: studentId, behaviorAction: index, behaviorValue: points }
    });
  },
  markAttendance: function(studentId, attendance){
    AppDispatcher.handleAction({
      actionType: ClassroomConstants.MARK_ATTENDANCE,
      data: {studentId: studentId, attendance: attendance}
    });
  },
  initQuery: function(classId){
    AppDispatcher.handleAction({
      actionType: ClassroomConstants.INIT_QUERY,
      data: classId
    });
  },
  endQuery: function(){
    AppDispatcher.handleAction({
      actionType: ClassroomConstants.END_QUERY,
      data: null
    });
  }
};

module.exports = ClassroomActions;
