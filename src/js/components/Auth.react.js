var React = require('react');
var authActions = require('../actions/AuthActions');
var authStore = require('../stores/AuthStore');

var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Navigation = Router.Navigation;

module.exports = function(ComposedComponent){ 
 return React.createClass({
  willTransitionTo: function (transition) {
    if (!authStore.isLoggedIn()) {
      // transition.redirect('/login', {}, {'nextPath' : transition.path});
      transition.redirect('/login');
    }
  },

  getInitialState: function() {
    // super()
    return {
      isAuth: this._getLoginState()
    }
  },

  _getLoginState: function() {
    return {
      userLoggedIn: authStore.isLoggedIn(),
      user: authStore.user,
    };
  },

  componentDidMount: function() {
    this.changeListener = this._onChange.bind(this);
    authStore.addChangeListener(this.changeListener);
  },

  _onChange: function() {
    this.setState({
      isAuth: this._getLoginState()
    })
  },

  componentWillUnmount: function() {
    authStore.removeChangeListener(this.changeListener);
  },

  render: function() {
    return (
    <ComposedComponent
      user={this.state.user}
      userLoggedIn={this.state.userLoggedIn} />
    );
  }

  
  });
};
  
// module.exports = function(ComposedComponent){
//   return Authenticated;
// };