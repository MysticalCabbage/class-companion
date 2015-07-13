var AppDispatcher = require('../dispatcher/AppDispatcher');
var AuthConstants = require('../constants/AuthConstants');

var AuthActions = {
  signup: function(credentials){
    AppDispatcher.handleAuth({
      actionType: AuthConstants.SIGNUP,
      data: credentials
    });
  },
  login: function(credentials){
    AppDispatcher.handleAuth({
      actionType: AuthConstants.LOGIN,
      data: credentials
    });
  },
  logout: function(){
    AppDispatcher.handleAuth({
      actionType: AuthConstants.LOGOUT,
      data: null
    });
  }
};

module.exports = AuthActions;
