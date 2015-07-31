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
  randStudent: function(){
    AppDispatcher.handleAction({
      actionType: ClassroomConstants.RAND_STUDENT,
      data: null
    });
  },
  randGroup: function(groupNum){
    AppDispatcher.handleAction({
      actionType: ClassroomConstants.RAND_GROUP,
      data: groupNum
    });
  },
  getBehaviors: function(chartData, totalCount, student, behaviorHistory, studentId){
    AppDispatcher.handleAction({
      actionType: ClassroomConstants.GET_BEHAVIORS,
      data: {chartData: chartData, total: totalCount, student: student, behaviorHistory: behaviorHistory, studentId: studentId}
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
  },
  endSelectQuery: function(){
    AppDispatcher.handleAction({
      actionType: ClassroomConstants.END_SELECT_QUERY,
      data: null
    });
  },
  getNewPokemon: function(studentId) {
    AppDispatcher.handleAction({
      actionType: ClassroomConstants.GET_NEW_POKEMON,
      data: studentId
    })
  },
};

module.exports = ClassroomActions;
