var TestUtils = require('react/addons').TestUtils;
var TeacherStore = require('../src/js/stores/TeacherStore');
var AppDispatcher = require('../src/js/dispatcher/AppDispatcher');

describe("TeacherStore", function() {

  beforeEach(function(){
  });

  afterEach(function(){
  });

  it("should be an object", function() {
    expect(TeacherStore).to.be.an('object');
  });

});
