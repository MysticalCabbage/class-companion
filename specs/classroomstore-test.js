var TestUtils = require('react/addons').TestUtils;
var ClassroomStore = require('../src/js/stores/ClassroomStore');
var AppDispatcher = require('../src/js/dispatcher/AppDispatcher');

describe("ClassroomStore", function() {

  beforeEach(function(){
  });

  afterEach(function(){
  });

  it("should be an object", function() {
    expect(ClassroomStore).to.be.an('object');
  });

});
