var AppDispatcher = require('../dispatcher/AppDispatcher');
var ClassroomConstants = require('../constants/ClassroomConstants');

var ClassroomActions = {
  addStudent: function(newStudent){
    AppDispatcher.handleAction({
      actionType: ClassroomConstants.ADD_STUDENT,
      data: newStudent
    });
  },
  removeStudent: function(student){
    AppDispatcher.handleAction({
      actionType: ClassroomConstants.REMOVE_STUDENT,
      data: student
    });
  },
  addPoint: function(student){
    AppDispatcher.handleAction({
      actionType: ClassroomConstants.ADD_POINT,
      data: student
    });
  },
  subtractPoint: function(student){
    AppDispatcher.handleAction({
      actionType: ClassroomConstants.SUBTRACT_POINT,
      data: student
    });
  }
};

module.exports = ClassroomActions;
