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
      	<Navbar loggedIn={this.state.loggedIn} openLoginModal={this.openLoginModal} openSignupModal={this.openSignupModal} />
      	<AboutUs />
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
