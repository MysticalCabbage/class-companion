var pokemonThatAreNotEvolutionaryLine = {
  83: true,
  95: true,
  106: true,
  107: true,
  108: true,
  113: true,
  115: true,
  128: true,
  122: true,
  123: true,
  124: true,
  125: true,
  126: true,
  128: true,
  131: true,
  133: true,
  137: true,
  142: true,
  143: true,
  144: true,
  145: true,
  146: true,
  150: true,
  151: true,
};

var pokemonThatAreBaseEvolutions = {
  1: true,
  4: true,
  10: true,
  13: true,
  16: true,
  19: true,
  21: true,
  23: true,
  25: true,
  27: true,
  29: true,
  32: true,
  35: true,
  39: true,
  41: true,
  43: true,
  46: true,
  48: true,
  50: true,
  52: true,
  54: true,
  56: true,
  60: true,
  63: true,
  66: true,
  69: true,
  72: true,
  74: true,
  77: true,
  79: true,
  81: true,
  84: true,
  86: true,
  88: true,
  90: true,
  92: true,
  96: true,
  98: true,
  100: true,
  102: true,
  104: true,
  109: true,
  111: true,
  114: true,
  116: true,
  118: true,
  120: true,
  127: true,
  128: true,
  129: true,
  133: true,
  137: true,
  138: true,
  140: true,
  147: true, 
};

var pokemonThatAreTheResultOfNonLevelEvolutions = {
  26: true,
  31: true,
  34: true,
  40: true,
  45: true,
  59: true,
  62: true,
  71: true,
  91: true,
  103: true,
  134: true,
  135: true,
  136: true,
};

// returns true if the given pokemon is a pokemon that is the result of a prior level evolution
var checkIfPokemonIsAnEvolutionaryForm = function(pokemonNumber) {
  if (pokemonThatAreBaseEvolutions[pokemonNumber] 
      || pokemonThatAreNotEvolutionaryLine[pokemonNumber]
      || pokemonThatAreTheResultOfNonLevelEvolutions[pokemonNumber]) {
    return false;
  } else {
    return true;
  }
}

module.exports = {
  'checkIfPokemonIsAnEvolutionaryForm': checkIfPokemonIsAnEvolutionaryForm
}