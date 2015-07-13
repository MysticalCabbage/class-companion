var AppDispatcher = require('../dispatcher/AppDispatcher');
var AuthConstants = require('../constants/AuthConstants');

var AuthActions = {
  signup: function(credentials){
    AppDispatcher.handleAction({
      actionType: AuthConstants.SIGNUP,
      data: credentials
    });
  },
  login: function(credentials){
    AppDispatcher.handleAction({
      actionType: AuthConstants.LOGIN,
      data: credentials
    });
  },
  logout: function(){
    AppDispatcher.handleAction({
      actionType: AuthConstants.LOGOUT,
      data: null
    });
  }
};

module.exports = AuthActions;
