var $ = require('jquery')
var Q = require('Q')

var generateRandomOriginalPokemonNumber = function() {
  return Math.floor(Math.random() * (152 - 1) + 1)
};


module.exports = {
  getNewPokemonFromServer: function(pokemonUrl) {
  // if no specific pokemon API url was given
  // generate a random pokemon
  pokemonUrl = pokemonUrl || ("api/v1/pokemon/" + generateRandomOriginalPokemonNumber())
  console.log('sending ajax to', pokemonUrl)
  return Q($.ajax({
      method: "GET",
      url: "http://pokeapi.co/" + pokemonUrl,
      dataType: "json"
    }));
  },

  getPokemonSprite: function(spriteUrl) {
  return Q($.ajax({
      method: "GET",
      url: "http://pokeapi.co/" + spriteUrl,
    }));
  },
}