var FirebaseStore = require('./FirebaseStore');
var firebaseRef = FirebaseStore.getDb();
var pokemonAPIUtils = require('../utils/PokemonWebAPIUtils');
var ClassroomStore = require('./ClassroomStore');


var getNewPokemon = function(studentId, classId, specificPokemonAPIUrl) {
  // if no specific pokemon url was passed in, set the value to null
  var specificspecificPokemonAPIUrl = specificPokemonAPIUrl || null
  var spriteUrl;
  var defaultPokemonProfile = {level: 1, currentExp: 1, expToNextLevel: 20}
  var pokemonDirectory = {};
  console.log('trying to get a pokemon for', studentId)

  pokemonAPIUtils.getNewPokemonFromServer(specificPokemonAPIUrl).then(function(pokemonData) {
    spriteUrl = pokemonData.sprites[0].resource_uri
    pokemonAPIUtils.getPokemonSprite(spriteUrl).then(function(pokemonSpriteData) {
      pokemonDirectory._pokemonData = pokemonData;
      pokemonDirectory._spriteData = pokemonSpriteData;
      pokemonDirectory._spriteUrl = "http://pokeapi.co" + pokemonSpriteData.image
      pokemonDirectory.profile = defaultPokemonProfile;
      pokemonDirectory.hasAPokemon = true;
      sendServerPokemon(studentId, classId, pokemonDirectory);
    }, function(error) {
      console.error('error getting a pokemon sprite data:', error);
      throw error
    });

  }, function(error) {
    console.error('error getting a random pokemon:', error);
    throw error
  });
};


var sendServerPokemon = function(studentId, classId, pokemonDirectory) {
  firebaseRef.child('classes/' 
                    + classId 
                    + '/students/' 
                    + studentId 
                    + '/pokemon/'
                    )
                    .set(pokemonDirectory);
}

var addExperiencePoints = function(data, classId) {
  var studentId = data.studentId
  var numberOfExperiencePointsToAdd = data.behaviorValue;
  var firebasePokemonDirectoryRef = firebaseRef.child('classes/' 
                            + classId 
                            + '/students/' 
                            + studentId
                            + '/pokemon/'
                            )
  var profileData;
  firebasePokemonDirectoryRef
    .once('value', function(pokemonDirectoryData){
      profileData = pokemonDirectoryData.val().profile;
      // if the pokemon needs to level up after adding the new experience points
      if (profileData.currentExp + numberOfExperiencePointsToAdd >= profileData.expToNextLevel) {
        // level up the pokemon
        handleLevelUp(firebasePokemonDirectoryRef, numberOfExperiencePointsToAdd, classId, studentId)
      } 
      // else if the pokemon does not need to level up
      else {
        // increase its experience points by the specified amount
        firebasePokemonDirectoryRef.child('profile').child('currentExp').transaction(function(current_value) {
          // if we are trying to decrease the experience, and the result is below zero
          if (current_value + numberOfExperiencePointsToAdd < 0) {
            // return 0 to prevent exprience going into negative
            return 0;
          } // else if the result of adding the experience points is above zero
          else {
            // add the new experience points
            return current_value + numberOfExperiencePointsToAdd

          }
        });
      }
  });

}


var handleLevelUp = function(firebasePokemonDirectoryRef, numberOfExperiencePointsToAdd, classId, studentId) {
  firebasePokemonDirectoryRef
    .once('value', function(pokemonDirectoryData){
      profileData = pokemonDirectoryData.val().profile;
      // stores the sum of the current exp and the number of points to add
      var accumulatedExp = profileData.currentExp + numberOfExperiencePointsToAdd
      var numberOfTimesToLevelUp = Math.floor(accumulatedExp / profileData.expToNextLevel)
      // stores the amount of leftover exp after leveling up
      var amountOfLeftoverExp = accumulatedExp % (profileData.expToNextLevel * numberOfTimesToLevelUp)
      firebasePokemonDirectoryRef.child('profile').child('level').transaction(function(current_value) {
          var newLevel = current_value + numberOfTimesToLevelUp
          var pokemonToEvolveToUrl = checkIfNeedToEvolve(newLevel, pokemonDirectoryData)
          if (pokemonToEvolveToUrl) {
            getNewPokemon(studentId, classId, pokemonToEvolveToUrl)
            // eject from the function so the pokemon doesn't evolve twice
            return
          } else {
            return newLevel
          }
      });

      firebasePokemonDirectoryRef.child('profile').child('currentExp').transaction(function(current_value) {
          return amountOfLeftoverExp
      });

  });
}
// if the pokemon needs to evolve
// then this function returns the URL of the pokemon to evolve to (truthy)
// else if the pokemon does not need to evolve, return null (falsey)
var checkIfNeedToEvolve = function(newLevel, pokemonDirectoryData) {
  var evolutions = pokemonDirectoryData.val()._pokemonData.evolutions

  // if the pokemon is capable of evolving into other pokemon
  if (evolutions) {
    console.log(evolutions)

    // for each evolution
    for (var i = 0; i < evolutions.length; i++) {
      // if the current pokemon should evolve into the new pokemon by leveling up
      if (newLevel >= evolutions[i].level && evolutions[i].method === "level_up") {
        // return the api uri call for the new pokemon
        return evolutions[i].resource_uri
      }
    }
  }
  // if the pokemon is not capable of evolving into other pokemon
  // or should not currently level up
  // return null
  return null;
}

module.exports = {
  'getNewPokemon': getNewPokemon,
  'sendServerPokemon': sendServerPokemon,
  'addExperiencePoints': addExperiencePoints,
  'handleLevelUp': handleLevelUp,
}