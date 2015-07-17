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
  addPoint: function(studentId, points){
    AppDispatcher.handleAction({
      actionType: ClassroomConstants.ADD_POINT,
      data: {studentId: studentId, behavior: points}
    });
  },
  subtractPoint: function(studentId, points){
    AppDispatcher.handleAction({
      actionType: ClassroomConstants.SUBTRACT_POINT,
      data: {studentId: studentId, behavior: points}
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
