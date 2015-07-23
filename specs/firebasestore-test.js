var TestUtils = require('react/addons').TestUtils;
var FirebaseStore = require('../src/js/stores/FirebaseStore');
var AppDispatcher = require('../src/js/dispatcher/AppDispatcher');

describe("FirebaseStore", function() {

  beforeEach(function(){
  });

  afterEach(function(){
  });

  it("should be an object", function() {
    expect(FirebaseStore).to.be.an('object');
  });

  it('should have a getDb method', function(){
    expect(FirebaseStore.getDb()).to.be.an('object');
  });

});
