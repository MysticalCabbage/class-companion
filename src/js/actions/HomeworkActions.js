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
  }
};

module.exports = HomeworkActions;
