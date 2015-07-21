var AppDispatcher = require('../dispatcher/AppDispatcher');
var AttendanceConstants = require('../constants/AttendanceConstants');

var AttendanceActions = {
  initQuery: function(classId){
    AppDispatcher.handleAction({
      actionType: AttendanceConstants.INIT_QUERY,
      data: classId
    });
  },
  endQuery: function(){
    AppDispatcher.handleAction({
      actionType: AttendanceConstants.END_QUERY,
      data: null
    });
  }
};

module.exports = AttendanceActions;
