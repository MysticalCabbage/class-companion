var AppDispatcher = require('../dispatcher/AppDispatcher');
var TeacherConstants = require('../constants/TeacherConstants');

var TeacherActions = {
  addClass: function(newClass){
    AppDispatcher.handleAction({
      actionType: TeacherConstants.ADD_CLASS,
      data: newClass
    })
  }
};

module.exports = TeacherActions;
