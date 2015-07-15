var React = require('react');
var App = require('./components/App.react');
var TeacherDashboard = require('./components/TeacherDashboard.react');
var TeacherClass = require('./components/TeacherClass.react');
var TeacherForm = require('./components/TeacherForm.react');
var ClassroomDashboard = require('./components/ClassroomDashboard');
var Auth = require('./components/Auth.react');
var Signup = require('./components/Signup.react');
var Login = require('./components/Login.react');

var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Redirect = Router.Redirect;
var Link = Router.Link;
var Navigation = Router.Navigation;

var routes = (
  <Route name="root" path="/" handler={App}>
  	<DefaultRoute handler={TeacherDashboard}/>
    <Route path="login" handler={Login}/>
    <Redirect from="logout" to="root" />
    <Route path="signup" handler={Signup}/>
    <Route path="teacherDashboard" handler={TeacherDashboard}/>
      <Route path="teacherClass/:id" handler={TeacherClass}/>
      <Route path="teacherForm" handler={TeacherForm}/>
    <Route path="classroomDashboard" handler={ClassroomDashboard}/>
  </Route>
);

Router.run(routes, Router.HashLocation, function(Root){
  React.render(<Root/>, document.getElementById('app'));
});
