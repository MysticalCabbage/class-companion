var TestUtils = require('react/addons').TestUtils;
var StudentSelectionStore = require('../src/js/stores/StudentSelectionStore');
var AppDispatcher = require('../src/js/dispatcher/AppDispatcher');

describe("StudentSelectionStore", function() {

  beforeEach(function(){
  });

  afterEach(function(){
  });

  it("should be an object", function() {
    expect(StudentSelectionStore).to.be.an('object');
  });
  
});
