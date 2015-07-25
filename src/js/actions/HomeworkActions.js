var AppDispatcher = require('../dispatcher/AppDispatcher');
var HomeworkConstants = require('../constants/HomeworkConstants');

var HomeworkActions = {
  addAssignment: function(assignment){
    AppDispatcher.handleAction({
      actionType: HomeworkConstants.ADD_ASSIGNMENT,
      data: assignment
    });
  }
};

module.exports = HomeworkActions;
