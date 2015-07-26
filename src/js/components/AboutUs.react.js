var React = require('react');

var AboutUs = React.createClass({

  render: function() {
    return (
      <div className="row">
        <div className="col-md-10 col-md-offset-1 text-center" id="about-us-container">
          <div className="row"><h2>About Us</h2></div>
          <div className="member-profiles row text-left">
            <div className="member-profile col-xs-3" id="jack-profile">
              <img src="/assets/jd.jpeg" className="profile-image" />
              <div className="text-center row profile-name">Jonathan Davis</div>
              <div className="text-center row">
                <ul className="nav navbar navbar-nav about-us-nav">
                  <li>
                    <a href="https://github.com/jdstep" target="_blank"><i className="fa fa-github fa-2x"></i></a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="member-profile col-xs-3" id="jack-profile">
              <img src="/assets/stacy.jpeg" className="profile-image" />
              <div className="text-center row profile-name">Stacy Huang</div>
              <div className="text-center row">
                <ul className="nav navbar navbar-nav about-us-nav">
                  <li>
                    <a href="https://github.com/stacyhuang" target="_blank"><i className="fa fa-github fa-2x"></i></a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="member-profile col-xs-3" id="jack-profile">
              <img src="/assets/eric.jpeg" className="profile-image" />
              <div className="text-center row profile-name">Eric Kao</div>
              <div className="text-center row">
                <ul className="nav navbar navbar-nav about-us-nav">
                  <li>
                    <a href="https://github.com/ericskao" target="_blank"><i className="fa fa-github fa-2x"></i></a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="member-profile col-xs-3" id="jack-profile">
              <img src="/assets/david.jpeg" className="profile-image" />
              <div className="text-center row profile-name">David Hom</div>
              <div className="text-center row">
                <ul className="nav navbar navbar-nav about-us-nav">
                  <li>
                    <a href="https://github.com/dlhom" target="_blank"><i className="fa fa-github fa-2x"></i></a>                  
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

module.exports = AboutUs;
