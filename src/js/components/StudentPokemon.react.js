var React = require('react');
var ClassroomStore = require('../stores/ClassroomStore');
var ClassroomActions = require('../actions/ClassroomActions');
var PokemonStore = require('../stores/PokemonStore');
var PokemonActions = require('../actions/PokemonActions');
var _ = require('underscore');

var React = require('react');

var StudentPokemon = React.createClass({

  getInitialState: function() {
    return PokemonStore.getPokemonIfNeeded()
  },

  componentDidMount: function() {
    PokemonStore.addChangeListener(this._onChange);
    this.getPokemonIfNeeded(this.props);
  },

  componentWillUnmount: function() {
    PokemonStore.removeChangeListener(this._onChange)
  },

  componentWillReceiveProps: function(nextProps) {
    this.getPokemonIfNeeded(nextProps);
  },

  getPokemonIfNeeded: function(props) {
    var meta = 
  },

  
  render: function() {
    return (
      <div>
        {this.state.pokemonName}
      </div>
    );
  }

});

module.exports = StudentPokemon;