var AppDispatcher = require('../dispatcher/AppDispatcher');
var TeacherConstants = require('../constants/TeacherConstants');

var TeacherActions = {
  addClass: function(newClass){
    AppDispatcher.handleAction({
      actionType: TeacherConstants.ADD_CLASS,
      data: newClass
    });
  },
  removeClass: function(ClassTitle){
    AppDispatcher.handleAction({
      actionType: TeacherConstants.REMOVE_CLASS,
      data: ClassTitle
    });
  },
  initInfo: function(teacherId){
    AppDispatcher.handleAction({
      actionType: TeacherConstants.INIT_INFO,
      data: teacherId
    });
  }
};

module.exports = TeacherActions;
