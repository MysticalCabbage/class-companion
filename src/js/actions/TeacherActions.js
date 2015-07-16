var AppDispatcher = require('../dispatcher/AppDispatcher');
var TeacherConstants = require('../constants/TeacherConstants');

var TeacherActions = {
  addClass: function(newClass){
    AppDispatcher.handleAction({
      actionType: TeacherConstants.ADD_CLASS,
      data: newClass
    });
  },
  removeClass: function(ClassId){
    AppDispatcher.handleAction({
      actionType: TeacherConstants.REMOVE_CLASS,
      data: ClassId
    });
  },
  initQuery: function(teacherId){
    AppDispatcher.handleAction({
      actionType: TeacherConstants.INIT_QUERY,
      data: teacherId
    });
  },
  endQuery: function(){
    AppDispatcher.handleAction({
      actionType: TeacherConstants.END_QUERY,
      data: null
    });
  }
};

module.exports = TeacherActions;
