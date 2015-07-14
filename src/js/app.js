var React = require('react');
var App = require('./components/App.react');
var TeacherDashboard = require('./components/TeacherDashboard.react');
var TeacherClass = require('./components/TeacherClass.react');
var Auth = require('./components/Auth.react');

var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Navigation = Router.Navigation;

var routes = (
  <Route path="/" handler={App}>
  	<DefaultRoute handler={TeacherDashboard}/>
    <Route path="login" handler={Auth.Login}/>
    <Route path="logout" handler={Auth.Logout}/>
    <Route path="signup" handler={Auth.Signup}/>
    <Route path="teacherDashboard" handler={TeacherDashboard}/>
    	<Route path="teacherClass/:id" handler={TeacherClass}/>
  </Route>
);

Router.run(routes, Router.HashLocation, function(Root){
  React.render(<Root/>, document.getElementById('app'));
});
