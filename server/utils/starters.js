/* contains a list of starter pokemons
bulbasaur, charmander, squirtle */

var bulbasaur = {
  "_pokemonData" : {
    "evolutions" : [ {
      "level" : 16,
      "method" : "level_up",
      "resource_uri" : "/api/v1/pokemon/2/",
      "to" : "Ivysaur"
    } ],
    "name" : "Bulbasaur",
    "resource_uri" : "/api/v1/pokemon/1/"
  },
  "_spriteData" : {
    "created" : "2013-11-16T17:20:39.964632",
    "id" : 2,
    "image" : "/media/img/1.png",
    "modified" : "2013-11-16T17:20:39.964589",
    "name" : "Bulbasaur_auto",
    "pokemon" : {
      "name" : "bulbasaur",
      "resource_uri" : "/api/v1/pokemon/1/"
    },
    "resource_uri" : "/api/v1/sprite/2/"
  },
  "_spriteUrl" : "http://pokeapi.co/media/img/1.png",
  "hasAPokemon" : true,
  "profile" : {
    "currentExp" : 1,
    "expToNextLevel" : 20,
    "level" : 1
  }
};

var charmander = {
  "_pokemonData" : {
    "evolutions" : [ {
      "level" : 16,
      "method" : "level_up",
      "resource_uri" : "/api/v1/pokemon/5/",
      "to" : "Charmeleon"
    } ],
    "name" : "Charmander",
    "resource_uri" : "/api/v1/pokemon/4/"
  },
  "_spriteData" : {
    "created" : "2013-11-16T17:20:39.979374",
    "id" : 5,
    "image" : "/media/img/4.png",
    "modified" : "2013-11-16T17:20:39.979346",
    "name" : "Charmander_auto",
    "pokemon" : {
      "name" : "charmander",
      "resource_uri" : "/api/v1/pokemon/4/"
    },
    "resource_uri" : "/api/v1/sprite/5/"
  },
  "_spriteUrl" : "http://pokeapi.co/media/img/4.png",
  "hasAPokemon" : true,
  "profile" : {
    "currentExp" : 1,
    "expToNextLevel" : 20,
    "level" : 1
  }
};

var squirtle = {
  "_pokemonData" : {
    "evolutions" : [ {
      "level" : 16,
      "method" : "level_up",
      "resource_uri" : "/api/v1/pokemon/8/",
      "to" : "Wartortle"
    } ],
    "name" : "Squirtle",
    "resource_uri" : "/api/v1/pokemon/7/"
  },
  "_spriteData" : {
    "created" : "2013-11-16T17:20:39.991007",
    "id" : 8,
    "image" : "/media/img/7.png",
    "modified" : "2013-11-16T17:20:39.990978",
    "name" : "Squirtle_auto",
    "pokemon" : {
      "name" : "squirtle",
      "resource_uri" : "/api/v1/pokemon/7/"
    },
    "resource_uri" : "/api/v1/sprite/8/"
  },
  "_spriteUrl" : "http://pokeapi.co/media/img/7.png",
  "hasAPokemon" : true,
  "profile" : {
    "currentExp" : 1,
    "expToNextLevel" : 20,
    "level" : 1
  }
}


var pikachu = {
  "_pokemonData" : {
    "evolutions" : [ {
      "method" : "stone",
      "resource_uri" : "/api/v1/pokemon/26/",
      "to" : "Raichu"
    } ],
    "name" : "Pikachu",
    "resource_uri" : "/api/v1/pokemon/25/"
  },
  "_spriteData" : {
    "created" : "2013-11-16T17:20:40.058559",
    "id" : 26,
    "image" : "/media/img/25.png",
    "modified" : "2013-11-16T17:20:40.058531",
    "name" : "Pikachu_auto",
    "pokemon" : {
      "name" : "pikachu",
      "resource_uri" : "/api/v1/pokemon/25/"
    },
    "resource_uri" : "/api/v1/sprite/26/"
  },
  "_spriteUrl" : "http://pokeapi.co/media/img/25.png",
  "hasAPokemon" : true,
  "profile" : {
    "currentExp" : 1,
    "expToNextLevel" : 20,
    "level" : 1
  }
};

module.exports = { 
  starters : [ 
    bulbasaur,
    squirtle,
    charmander,
    pikachu
  ]
};
