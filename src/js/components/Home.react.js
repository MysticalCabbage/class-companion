var React = require('react');
var Navbar = require('./Navbar.react');
var Login = require('./Login.react');
var Signup = require('./Signup.react');
var AuthStore = require('../stores/AuthStore');
var Modal = require('react-modal');
var Auth = require('../services/AuthService');
var Spinner = require('spin');

var appElement = document.app;
Modal.setAppElement(appElement);
Modal.injectCSS();

var Home = React.createClass({
  getInitialState: function(){
    return {
      loggedIn: AuthStore.checkAuth(),
      loginModalIsOpen: false,
      signupModalIsOpen: false,
      demoSignup: false
    }
  },

  componentDidMount: function(){
    AuthStore.addChangeListener(this._onChange);
    this.setState.demoSignup = false;
  },

  componentWillUnmount: function(){
    AuthStore.removeChangeListener(this._onChange);
  },

  // Whenever data in the store changes, fetch data from the store and update the component state
  _onChange: function(){
    this.setState({
      loggedIn: AuthStore.checkAuth()
    });
  },

  openLoginModal: function(){
    this.setState({loginModalIsOpen: true});
  },
  
  closeLoginModal: function(){
    this.setState({loginModalIsOpen: false});
  },

  openSignupModal: function(){
    this.setState({signupModalIsOpen: true});
  },
  
  closeSignupModal: function(){
    this.setState({signupModalIsOpen: false});
  },

  switchModal: function(){
    this.setState({
      loginModalIsOpen: !this.state.loginModalIsOpen,
      signupModalIsOpen: !this.state.signupModalIsOpen
    });
  },

  handleLogout: function(){
    Auth.logout();
  },

  demoSignup: function(){
    // set demoSignup to true which is passed into signup modal
    this.setState({demoSignup: true });
    this.setState({signupModalIsOpen: true});

    // signup with random string email and password
    Auth.signup({
      email: Auth.makeid(10) + '@' + Auth.makeid(10) + '.com',
      password: Auth.makeid(5),
      prefix: '',
      firstName: '',
      lastName: ''
    });
  },

  render: function() {
    return (
      <div className="home">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header page-scroll">
              <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand page-scroll" href="#page-top">Class Companion</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li className="page-scroll">
                  <a href="https://github.com/MysticalCabbage/class-companion">GitHub</a>
                </li>
                <li className="hidden">
                  <a href="#page-top"></a>
                </li>
                { this.state.loggedIn ? null :
                <li className="page-scroll">
                  <a onClick={this.demoSignup}><strong>Demo</strong></a>
                </li>
                }
                <li className="page-scroll">
                  <a href="#about">Learn More</a>
                </li>
                <li className="page-scroll">
                  <a href="#mobile">Mobile App</a>
                </li>
                <li className="page-scroll">
                  <a href="#team">Team</a>
                </li>
                { this.state.loggedIn ? 
                <li>
                  <a href={'#/teacherDashboard/'}>Enter Classroom</a>
                </li>
                : null }
                { this.state.loggedIn ? 
                <li className="page-scroll">
                  <a onClick={this.handleLogout}>Logout</a>
                </li>
                : null }
                { this.state.loggedIn ? null :
                <li className="page-scroll">
                  <a onClick={this.openLoginModal}>Login</a>
                </li>
                }
              </ul>
            </div>
          </div>
        </nav>
        <header>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <img className="img-responsive favicon" src="/assets/favicon.ico" alt="" />
                <div className="intro-text">
                  <span className="name">CLASS COMPANION</span>
                  <hr className="star-light" />
                  <span className="skills">A classroom management tool for teachers</span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 text-center">
                <a onClick={this.demoSignup} className="btn btn-success" id="demo-button" role="button">Start a demo</a>
              </div>
            </div>
          </div>
        </header> 
        <section id="about" className="bg-light-gray">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading">Features</h2>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-md-4">
                <span className="fa-stack fa-4x">
                  <i className="fa fa-circle fa-stack-2x text-primary"></i>
                  <i className="fa fa-check-square-o fa-stack-1x fa-inverse"></i>
                </span>
                <h4 className="about-heading">Attendance</h4>
                <p className="text-muted">Take attendance of your class in the mornings. The attendance reports show which students are constantly tardy or absent.</p>
              </div>
              <div className="col-md-4">
                <span className="fa-stack fa-4x">
                    <i className="fa fa-circle fa-stack-2x text-primary"></i>
                    <i className="fa fa-users fa-stack-1x fa-inverse"></i>
                </span>
                <h4 className="about-heading">Group</h4>
                <p className="text-muted">Set up groups for your classroom. Pair students up or select different group sizes.</p>
              </div>
              <div className="col-md-4">
                <span className="fa-stack fa-4x">
                    <i className="fa fa-circle fa-stack-2x text-primary"></i>
                    <i className="fa fa-random fa-stack-1x fa-inverse"></i>
                </span>
                <h4 className="about-heading">Random</h4>
                <p className="text-muted">Pick a random student for questions and participation. Liven things up or keep students on their toes. </p>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-md-4">
                <span className="fa-stack fa-4x">
                    <i className="fa fa-circle fa-stack-2x text-primary"></i>
                    <i className="fa fa-clock-o fa-stack-1x fa-inverse"></i>
                </span>
                <h4 className="about-heading">Timer</h4>
                <p className="text-muted">The timer is perfect for quizes, tests, and presentations. Use the timer to encourage time management and keeping students focused.</p>
              </div>
              <div className="col-md-4">
                <span className="fa-stack fa-4x">
                    <i className="fa fa-circle fa-stack-2x text-primary"></i>
                    <i className="fa fa-book fa-stack-1x fa-inverse"></i>
                </span>
                <h4 className="about-heading">Homework</h4>
                <p className="text-muted">Assign homework assignments or send homework reminders. Need to make an announcement? Message students or parents.</p>
              </div>
              <div className="col-md-4">
                <span className="fa-stack fa-4x">
                    <i className="fa fa-circle fa-stack-2x text-primary"></i>
                    <i className="fa fa-pie-chart fa-stack-1x fa-inverse"></i>
                </span>
                <h4 className="about-heading">Reports</h4>
                <p className="text-muted">See a timeline of students’ progress - keep track of student behaviors over time.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="mobile">
          <div className="container">
            <div className="row">
              <div className="col-md-8">
                <h2 className="section-heading">Mobile iOS App</h2>
                <h3 className="section-subheading text-muted">Manage the class from your phone while teaching</h3>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mobile-description-box">
                      <h3>Groups</h3>
                      <p>Sort groups students into groups with a few taps</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mobile-description-box">
                      <h3>Behavior</h3>
                      <p>Assign points to students based on their in-class behavior</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mobile-description-box">
                      <h3>Attendance</h3>
                      <p>Take daily attendance from the phone</p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mobile-description-box">
                      <h3>Select Students</h3>
                      <p>Randomly or manually select a student from the phone and have their name appear on the projector</p>
                    </div>
                  </div>
                </div>
                <div className="row">
                <div className="col-md-6">
                  <div className="mobile-description-box">
                    <h3>Students</h3>
                    <p>Seamlessly add and remove students with live updates</p>
                  </div>
                </div>
                  <div className="col-md-6">
                    <div className="mobile-description-box">
                      <h3>Classes</h3>
                      <p>Add and remove classes right from the phone</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
              <img src="/assets/iphone-points.png" className="img-responsive" alt="" />
              </div>
            </div>
          </div>
        </section>
        <section id="team" className="bg-light-gray">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading">Our Amazing Team</h2>
                <h3 className="section-subheading text-muted"></h3>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <div className="team-member">
                  <img src="/assets/jd.jpeg" className="img-responsive img-circle center-block" alt="" />
                  <h4>Jonathan Davis</h4>
                  <p className="text-muted">Fullstack Engineer / Product Owner</p>
                  <ul className="list-inline social-buttons">
                    <li><a href="https://github.com/jdstep"><i className="fa fa-github"></i></a>
                    </li>
                    <li><a href="https://www.linkedin.com/in/jdstep"><i className="fa fa-linkedin"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="team-member">
                  <img src="/assets/stacy.jpeg" className="img-responsive img-circle center-block" alt="" />
                  <h4>Stacy Huang</h4>
                  <p className="text-muted">Fullstack Engineer / Lead Front-End Engineer</p>
                  <ul className="list-inline social-buttons">
                    <li><a href="https://github.com/stacyhuang"><i className="fa fa-github"></i></a>
                    </li>
                    <li><a href="https://www.linkedin.com/in/stacyhuang"><i className="fa fa-linkedin"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="team-member">
                  <img src="/assets/eric.jpeg" className="img-responsive img-circle center-block" alt="" />
                  <h4>Eric Kao</h4>
                  <p className="text-muted">Fullstack Engineer / Scrum Master</p>
                  <ul className="list-inline social-buttons">
                    <li><a href="https://github.com/ericskao"><i className="fa fa-github"></i></a>
                    </li>
                    <li><a href="https://www.linkedin.com/pub/eric-kao/25/bb9/3b1"><i className="fa fa-linkedin"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="team-member">
                  <img src="/assets/david.jpeg" className="img-responsive img-circle center-block" alt="" />
                  <h4>David Hom</h4>
                  <p className="text-muted">Fullstack Engineer / Lead Back-End Engineer</p>
                  <ul className="list-inline social-buttons">
                    <li><a href="https://github.com/dlhom"><i className="fa fa-github"></i></a>
                    </li>
                    <li><a href="https://www.linkedin.com/in/dlhom"><i className="fa fa-linkedin"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
                <div className="col-lg-8 col-lg-offset-2 text-center">
                    <p className="large text-muted"></p>
                </div>
            </div>
          </div>
        </section>
        <Modal className="loginModal" isOpen={this.state.loginModalIsOpen} onRequestClose={this.closeLoginModal}>
          <Login closeLoginModal={this.closeLoginModal} switchModal={this.switchModal} />
        </Modal>
        <Modal className="signupModal" isOpen={this.state.signupModalIsOpen} onRequestClose={this.closeSignupModal}>
          <Signup closeSignupModal={this.closeSignupModal} switchModal={this.switchModal} demoSignup={this.state.demoSignup} />
        </Modal>
      </div>
    );
  }

});

module.exports = Home;
