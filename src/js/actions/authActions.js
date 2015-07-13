var AppDispatcher = require('../dispatchers/dispatcher');
var AuthConstants = require('../constants/authConstants');

var authActions = {
  signup: function(credentials){
    //console.log('action', credentials)
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

module.exports = authActions;
