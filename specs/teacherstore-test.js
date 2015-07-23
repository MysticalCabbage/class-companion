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

  it('should have an addChangeListener method', function(){
    expect(TeacherStore.addChangeListener).to.exist;
  });

  it('should have a removeChangeListener method', function(){
    expect(TeacherStore.removeChangeListener).to.exist;
  });

  it('should have a getList method', function(){
    expect(TeacherStore.getList).to.exist;
  });

  it('should have a getInfo method', function(){
    expect(TeacherStore.getInfo).to.exist;
  });


});
