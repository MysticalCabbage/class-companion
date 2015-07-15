var React = require('react');
var App = require('./components/App.react');
var TeacherDashboard = require('./components/TeacherDashboard.react');
var TeacherClass = require('./components/TeacherClass.react');
var TeacherForm = require('./components/TeacherForm.react');
var ClassroomDashboard = require('./components/ClassroomDashboard.react');
// var Auth = require('./components/Auth.react');
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
// var AuthenticatedApp = require('./components/AuthenticatedApp');

var routes = (
  // <Route name="root" path="/" handler={App}>
  // <Route handler={AuthenticatedApp}>
  <Route handler={App}>
  	<DefaultRoute handler={TeacherDashboard}/>
    // Delete if necessary
    <Route name="home" path="/" handler={TeacherDashboard}/>
    <Route path="login" handler={Login}/>
    <Route path="signup" handler={Signup}/>
    <Redirect from="logout" to="root" />
    <Route path="teacherDashboard" handler={TeacherDashboard}/>
    <Route path="teacherForm" handler={TeacherForm}/>
    <Route path="classroomDashboard" handler={ClassroomDashboard}/>
  </Route>
);

var router = Router.create({routes});
RouterContainer.set(router);

// // Not sure what these are for
// let jwt = localStorage.getItem('jwt');
// if (jwt) {
//   LoginActions.loginUser(jwt);
// }

router.run(function(Root){
  React.render(<Root/>, document.getElementById('app'));
});
