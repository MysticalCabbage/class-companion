var AppDispatcher = require('../dispatcher/AppDispatcher');
var AuthConstants = require('../constants/AuthConstants');
var RouterContainer = require('../services/RouterContainer');

var AuthActions = {
  signup: function(data, loggedIn){
    AppDispatcher.handleAction({
      actionType: AuthConstants.SIGNUP,
      data: data,
      loggedIn: loggedIn
    });
  },
  login: function(data, loggedIn){
    AppDispatcher.handleAction({
      actionType: AuthConstants.LOGIN,
      data: data,
      loggedIn: loggedIn
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

