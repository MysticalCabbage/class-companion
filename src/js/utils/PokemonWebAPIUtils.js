var $ = require('jquery')
var Q = require('Q')

var generateRandomOriginalPokemonNumber = function() {
  return Math.floor(Math.random() * (152 - 1) + 1)
};


module.exports = {
  getRandomPokemon: function() {
  var pokemonNumber = generateRandomOriginalPokemonNumber()
  return Q($.ajax({
      method: "GET",
      url: "http://pokeapi.co/api/v1/pokemon/" + pokemonNumber,
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