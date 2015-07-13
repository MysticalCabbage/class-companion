var React = require('react');

var TeacherForm = React.createClass({
	getInitialState: function(){
		return null;
	},

	render: function() {
		return (
			<div className="teacherForm container">
			  <div className="row">
			    <div className="col-sm-6 well text-center">
			      <form>
			        <label for="">Give your class a name</label>
			        <div className="form-group">
			          <input type="text" id="newClass" className="form-control" placeholder="Example: JD's English Class" />
			        </div>
			      	<button type="submit" id="addNewClass" className="btn btn-primary btn-block submit-button">Create my class!</button>
			      </form>
			    </div> 
			  </div> 
			</div>
		);
	}

});

module.exports = TeacherForm;