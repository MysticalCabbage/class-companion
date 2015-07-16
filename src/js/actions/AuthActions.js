var AppDispatcher = require('../dispatcher/AppDispatcher');
var AuthConstants = require('../constants/AuthConstants');
var RouterContainer = require('../services/RouterContainer');

var AuthActions = {
  signup: function(data, loggedIn){
    if (loggedIn) {
      var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';
      RouterContainer.get().transitionTo(nextPath);
    }
    AppDispatcher.handleAction({
      actionType: AuthConstants.SIGNUP,
      data: data,
      loggedIn: loggedIn
    });
  },
  login: function(data, loggedIn){
    // Go to the Home page once the user is logged in
    if (loggedIn) {
      var nextPath = RouterContainer.get().getCurrentQuery().nextPath || '/';
      RouterContainer.get().transitionTo(nextPath);
    }

    AppDispatcher.handleAction({
      actionType: AuthConstants.LOGIN,
      data: data,
      loggedIn: loggedIn
    });
  },
  logout: function(){
    RouterContainer.get().transitionTo('/login');
    AppDispatcher.handleAction({
      actionType: AuthConstants.LOGOUT,
      data: null
    });
  }
};

module.exports = AuthActions;

