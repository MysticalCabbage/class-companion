var React = require('react');

var HomeworkForm = React.createClass({
  getInitialState: function(){
    return null
  },
  componentWillMount: function(){

  },
  render: function(){
    return (
      <div className="homeworkForm">
        <div className="well text-center">
          <form>
            <label for="">Assignment</label>
            <div className="form-group">
              <input type="text" ref="newStudent" id="newStudent" className="form-control" placeholder="Example: Pikachu"  />
            </div>
            <button type="submit" className="btn btn-primary btn-block submit-button">Add student!</button>
          </form>
        </div> 
      </div>
    );
  }
});

module.exports = HomeworkForm;
