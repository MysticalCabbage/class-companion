var React = require('react');
var App = require('./components/App.react');
var TeacherDashboard = require('./components/TeacherDashboard.react');
var TeacherClass = require('./components/TeacherClass.react');
var TeacherForm = require('./components/TeacherForm.react');
var ClassroomDashboard = require('./components/ClassroomDashboard.react');
var Signup = require('./components/Signup.react');
var Login = require('./components/Login.react');

var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Redirect = Router.Redirect;
var Link = Router.Link;
var Navigation = Router.Navigation;
var RouterContainer = require('./services/RouterContainer');

var routes = (
  <Route path="/" handler={App}>
  	<DefaultRoute handler={TeacherDashboard}/>
    <Route path="login" handler={Login}/>
    <Route path="signup" handler={Signup}/>
    <Route path="teacherDashboard" handler={TeacherDashboard}/>
    <Route path="teacherForm" handler={TeacherForm}/>
    <Route path="classroomDashboard/:id" handler={ClassroomDashboard}/>
  </Route>
);

var router = Router.create({routes});
RouterContainer.set(router);

router.run(function(Root){
  React.render(<Root/>, document.getElementById('app'));
});
