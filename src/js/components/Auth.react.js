var React = require('react');
var authActions = require('../actions/AuthActions');
var authStore = require('../stores/AuthStore');

var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Navigation = Router.Navigation;

var Auth = {};

Auth.Authentication = {
  statics: {
    willTransitionTo: function (transition) {
      var nextPath = transition.path;

      // To delete line 20 and uncomment line 24 when we get authStore.checkAuth() to work
      var test = true;

      // Redirect to /login if false. 
      if (!test) {
      // if (!authStore.checkAuth()) {
        transition.redirect('/login',{},
          { 'nextPath' : nextPath });
      }
    }
  }
};

module.exports = Auth;
