var AppDispatcher = require('../dispatcher/AppDispatcher');
var HomeworkConstants = require('../constants/HomeworkConstants');

var HomeworkActions = {
  addAssignment: function(assignment){
    AppDispatcher.handleAction({
      actionType: HomeworkConstants.ADD_ASSIGNMENT,
      data: assignment
    });
  },
  initQuery: function(classId){
    AppDispatcher.handleAction({
      actionType: HomeworkConstants.INIT_QUERY,
      data: classId
    });
  },
  endQuery: function(){
    AppDispatcher.handleAction({
      actionType: HomeworkConstants.END_QUERY,
      data: null
    });
  },
  removeAssignment: function(hwId){
    AppDispatcher.handleAction({
      actionType: HomeworkConstants.REMOVE_ASSIGNMENT,
      data: hwId
    });
  },
  getPastAssignments: function(){
    AppDispatcher.handleAction({
      actionType: HomeworkConstants.PAST_ASSIGNMENTS,
      data: null
    });
  },
  monthSelected: function(month){
   AppDispatcher.handleAction({
      actionType: HomeworkConstants.MONTH_SELECTED,
      data: month
    });
  },
  addStudentEmail: function(email){
    AppDispatcher.handleAction({
      actionType: HomeworkConstants.ADD_STUDENT_EMAIL,
      data: email
    });
  },
  addParentEmail: function(email){
    AppDispatcher.handleAction({
      actionType: HomeworkConstants.ADD_PARENT_EMAIL,
      data: email
    });
  }
};

module.exports = HomeworkActions;
