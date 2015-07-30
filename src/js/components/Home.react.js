var React = require('react');
var Navbar = require('./Navbar.react');
var AboutUs = require('./AboutUs.react');
var Login = require('./Login.react');
var Signup = require('./Signup.react');
var AuthStore = require('../stores/AuthStore');
var Modal = require('react-modal');

var appElement = document.app;
Modal.setAppElement(appElement);
Modal.injectCSS();

var Home = React.createClass({
  getInitialState: function(){
    return {
      loggedIn: AuthStore.checkAuth(),
      loginModalIsOpen: false,
      signupModalIsOpen: false
    }
  },

  componentDidMount: function(){
    AuthStore.addChangeListener(this._onChange);
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
              </button>
              <a className="navbar-brand page-scroll" href="#page-top">Class Companion</a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li className="hidden">
                  <a href="#page-top"></a>
                </li>
                <li className="page-scroll">
                  <a href="#about">ABOUT</a>
                </li>
                <li className="page-scroll">
                  <a href="#mobile">MOBILE</a>
                </li>
                <li className="page-scroll">
                  <a href="#team">TEAM</a>
                </li>
                { this.state.loggedIn ? 
                <li className="page-scroll">
                  <a onClick={this.handleLogout}>LOGOUT</a>
                </li>
                : null }
                { this.state.loggedIn ? null :
                <li className="page-scroll">
                  <a onClick={this.openLoginModal}>OGIN</a>
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
                <img className="img-responsive favicon" src="/assets/pikachu.png" alt="" />
                <div className="intro-text">
                  <span className="name">CLASS COMPANION</span>
                  <hr className="star-light" />
                  <span className="skills">Classroom management tool for teachers</span>
                </div>
              </div>
            </div>
          </div>
        </header> 
        <section id="about" className="bg-light-gray">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading">FEATURES</h2>
                <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-md-4">
                <span className="fa-stack fa-4x">
                  <i className="fa fa-circle fa-stack-2x text-primary"></i>
                  <i className="fa fa-check-square-o fa-stack-1x fa-inverse"></i>
                </span>
                <h4 className="about-heading">Attendance</h4>
                <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
              </div>
              <div className="col-md-4">
                <span className="fa-stack fa-4x">
                    <i className="fa fa-circle fa-stack-2x text-primary"></i>
                    <i className="fa fa-users fa-stack-1x fa-inverse"></i>
                </span>
                <h4 className="about-heading">Group</h4>
                <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
              </div>
              <div className="col-md-4">
                <span className="fa-stack fa-4x">
                    <i className="fa fa-circle fa-stack-2x text-primary"></i>
                    <i className="fa fa-random fa-stack-1x fa-inverse"></i>
                </span>
                <h4 className="about-heading">Random</h4>
                <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
              </div>
            </div>
            <div className="row text-center">
              <div className="col-md-4">
                <span className="fa-stack fa-4x">
                    <i className="fa fa-circle fa-stack-2x text-primary"></i>
                    <i className="fa fa-clock-o fa-stack-1x fa-inverse"></i>
                </span>
                <h4 className="about-heading">Timer</h4>
                <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
              </div>
              <div className="col-md-4">
                <span className="fa-stack fa-4x">
                    <i className="fa fa-circle fa-stack-2x text-primary"></i>
                    <i className="fa fa-book fa-stack-1x fa-inverse"></i>
                </span>
                <h4 className="about-heading">Homework</h4>
                <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
              </div>
              <div className="col-md-4">
                <span className="fa-stack fa-4x">
                    <i className="fa fa-circle fa-stack-2x text-primary"></i>
                    <i className="fa fa-pie-chart fa-stack-1x fa-inverse"></i>
                </span>
                <h4 className="about-heading">Reports</h4>
                <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.</p>
              </div>
            </div>
          </div>
        </section>
        <section id="mobile">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h2 className="section-heading">Mobile</h2>
                <h3 className="section-subheading text-muted">Manage your class from your phone</h3>
              </div>
              <div className="col-lg-6">
              <img src="/assets/iphone-white-mockup-md.png" className="img-responsive" alt="" />
              </div>
            </div>
          </div>
        </section>
        <section id="team" className="bg-light-gray">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 text-center">
                <h2 className="section-heading">Our Amazing Team</h2>
                <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur.</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-3">
                <div className="team-member">
                  <img src="/assets/jd.jpeg" className="img-responsive img-circle" alt="" />
                  <h4>Jonathan Davis</h4>
                  <p className="text-muted">Product Owner</p>
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
                  <img src="/assets/stacy.jpeg" className="img-responsive img-circle" alt="" />
                  <h4>Stacy Huang</h4>
                  <p className="text-muted">Lead Front-End Engineer</p>
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
                  <img src="/assets/eric.jpeg" className="img-responsive img-circle" alt="" />
                  <h4>Eric Kao</h4>
                  <p className="text-muted">Scrum Master</p>
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
                  <img src="/assets/david.jpeg" className="img-responsive img-circle" alt="" />
                  <h4>David Hom</h4>
                  <p className="text-muted">Lead Back-End Engineer</p>
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
                    <p className="large text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut eaque, laboriosam veritatis, quos non quis ad perspiciatis, totam corporis ea, alias ut unde.</p>
                </div>
            </div>
          </div>
        </section>
        <Modal className="loginModal" isOpen={this.state.loginModalIsOpen} onRequestClose={this.closeLoginModal}>
          <Login closeLoginModal={this.closeLoginModal} switchModal={this.switchModal} />
        </Modal>
        <Modal className="signupModal" isOpen={this.state.signupModalIsOpen} onRequestClose={this.closeSignupModal}>
          <Signup closeSignupModal={this.closeSignupModal} switchModal={this.switchModal} />
        </Modal>
      </div>
    );
  }

});

module.exports = Home;
