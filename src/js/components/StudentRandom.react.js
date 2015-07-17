var React = require('react');

var StudentRandom = React.createClass({
  closeModal: function(){
    console.log('close');
  },
  render: function(){
    return (
      <div className="StudentRandom col-md-3">
        <div className="well">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <div>Random Pick</div>
            <button type="button" className="close" aria-label="Close" onClick={this.closeModal}><span aria-hidden="true">&times;</span></button>
          </div>
        </div>
          <div>{this.props.student}</div>
        </div>
      </div>
    );
  }
});

module.exports = StudentRandom;
