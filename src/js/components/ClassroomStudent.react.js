var React = require('react');
var BehaviorButtons = require('./BehaviorButtons.react');
var DeleteConfirm = require('./DeleteConfirm.react');
var ClassroomStore = require('../stores/ClassroomStore');
var ClassroomActions = require('../actions/ClassroomActions');
var Modal = require('react-modal');

var appElement = document.getElementById('app');
Modal.setAppElement(appElement);
Modal.injectCSS();

var ClassroomStudent = React.createClass({
  getInitialState: function(){
    return {
      toggle: this.props.status || 'Present',
      behaviorModalIsOpen: false,
      deleteConfirmModal: false
    }
  },

  removeStudent: function(){
    ClassroomActions.removeStudent(this.props.studentId);
  },

  openBehaviorModal: function(){
    this.setState({behaviorModalIsOpen: true});
  },
  
  closeBehaviorModal: function() {
    this.setState({behaviorModalIsOpen: false});
  },

  openDeteleConfirmModal: function(){
    this.setState({deleteConfirmModal: true});
  },

  closeDeleteConfirmModal: function(){
    this.setState({deleteConfirmModal: false});
  },

  componentDidMount: function() {
    // if the current student does not have a pokemon
    if (!this.props.pokemon.hasAPokemon) {
      // get a new pokemon for this student
      ClassroomActions.getNewPokemon(this.props.studentId);
    }
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({
      toggle: newProps.status
    });
  },


  markAttendance: function(attendance){
    this.props.markAttendance(this.props.studentId, attendance);
    var toggleState = this.state.toggle;
    if(toggleState === 'Present'){
      toggleState = 'Late';
    }else if(toggleState === 'Late'){
      toggleState = 'Absent';
    }else{
      toggleState = 'Present';
    }

    this.setState({
      toggle: toggleState
    });
  },

  /**
   * The PokeAPI disabled hotlinking the sprites. The quick fix below
   * converts the PokeAPI sprite url into url for the local
   * sprite for that particular Pokemon.
   *
   * The format from the PokeAPI is as follows: http://pokeapi.co/media/img/1.png
   *
   * The longer term solution would be to update the 'getNewPokemon' function
   * in "ClassroomStorePokemonFunctions", however this quick fix will do for now.
   *
   * Jonathan 22 February 2017
   */
  fixSpriteUrl: function(serverSpriteUrl) {
    // if there is no sprite url, or the sprite url is linking to the api 
    if (!serverSpriteUrl || /pokeapi/.test(serverSpriteUrl) === false) {
      return serverSpriteUrl;
    }
    var filename = serverSpriteUrl.split('/').pop();
    var pokemonId = filename.split('.')[0];
    return './assets/pokemon/' + pokemonId + '.png';

  },

  render: function(){
    var pokemonName = this.props.pokemon._pokemonData.name;
    // var spriteUrl = this.props.pokemon._spriteUrl;
    var spriteUrl = this.fixSpriteUrl(this.props.pokemon._spriteUrl);
    var currentExp = this.props.pokemon.profile.currentExp;
    var expToNextLevel = this.props.pokemon.profile.expToNextLevel;
    var level = this.props.pokemon.profile.level;
    var currentExpPercentage = Math.floor((currentExp / expToNextLevel) * 100)
    var progressBarStyle = {
      minWidth: '0',
      width: currentExpPercentage + '%'
    }

    // format the student name
    // split first name and remaining name
    // display up to 6 characters
    var studentTitle = this.props.studentTitle;
    var idxSpace = studentTitle.indexOf(' ');
    var studentFirstName = studentTitle.substr(0, idxSpace);
    var studentLastName = studentTitle.substr(idxSpace + 1);
    studentFirstName = (studentFirstName.length > 6) ? studentFirstName.slice(0,6) + '...' : studentFirstName;
    studentLastName = (studentLastName.length > 6) ? studentLastName.slice(0,6) + '...' : studentLastName;

    // if studentTitle only contains first name
    // idxSpace is equal to -1, causing firstname to be empty string
    if(studentFirstName === ''){
      studentFirstName = studentLastName;
      studentLastName = ''
    }

    return (
      <div className="col-md-3" >
        { this.props.attendance ? 
        <div className="attendanceButton btn-group" role="group" aria-label="attendanceButtonBar">
          { this.state.toggle === 'Present' ? 
          <button type="button" onClick={this.markAttendance.bind(this, 'Late')} className="btn btn-success">Present</button>
          : null }
          { this.state.toggle === 'Late' ? 
          <button type="button" onClick={this.markAttendance.bind(this, 'Absent')} className="btn btn-warning">Late</button>
          : null }
          { this.state.toggle === 'Absent' ? 
          <button type="button" onClick={this.markAttendance.bind(this, 'Present')} className="btn btn-danger">Absent</button>
          : null }
        </div>
        : null }
        {this.props.showBehavior ? 
        <div className="image">
          <p className="behaviorPoints">{this.props.behavior}</p>
        </div>
        : null}
        <div className="well classroomStudent">
          <div>
            <button type="button" className="close" aria-label="Close" onClick={this.openDeteleConfirmModal}><span aria-hidden="true">&times;</span></button>
          </div>
          <div className="row studentSection" onClick={this.openBehaviorModal}>
            <div className="avatar col-md-5">
              <img className="avatarImg" src={spriteUrl} />
            </div>
            <div className="studentInfo col-md-7">
              <div className="studentTitle studentFirstName">{studentFirstName}</div>
              <div className="studentTitle studentLastName">{studentLastName}</div>
              {this.props.isGrouped ? <div className="studentGroup">Group: {this.props.groupNum}</div> : null}
            </div>
          </div>
          <div className="pokemonSpecs">
            <div className="pokemonName">{pokemonName}</div><div className="pokemonLevel">Lv {level}</div>
            <div className="hpBar">
              <div className="hp">HP</div>
              <div className="progress">
                <div className="progress-bar" role="progressbar" aria-valuenow={currentExpPercentage}  aria-valuemax={expToNextLevel} style={progressBarStyle}>
                </div>
              </div>
            </div>
            <div className="pokemonExp">{currentExp}/20</div>
          </div>
          <Modal className="behaviorModal" isOpen={this.state.behaviorModalIsOpen} onRequestClose={this.closeBehaviorModal}>
            <BehaviorButtons studentId={this.props.studentId} studentTitle={this.props.studentTitle} closeBehaviorModal={this.closeBehaviorModal} />
          </Modal>
          <Modal className="deleteConfirmModal"
            isOpen={this.state.deleteConfirmModal}
            onRequestClose={this.closeDeleteConfirmModal}>
            <DeleteConfirm closeDeleteConfirmModal={this.closeDeleteConfirmModal}
              confirmDelete={this.removeStudent}
              toBeDeleted={this.props.studentTitle}/>
          </Modal>
        </div>
      </div>
    );
  }
});

module.exports = ClassroomStudent;
