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

  it('should have a addChangeListener method', function(){
    expect(ClassroomStore.addChangeListener).to.exist;
  });
  
  it('should have a removeChangeListener method', function(){
    expect(ClassroomStore.removeChangeListener).to.exist;
  });

  it('should have a getList method', function(){
    expect(ClassroomStore.getList).to.exist;
  });

  it('should have a getInfo method', function(){
    expect(ClassroomStore.getInfo).to.exist;
  });

  it('getList method should return empty object when not logged in', function(){
    expect(ClassroomStore.getList()).to.be.an('object');
  });
  
  it('getInfo method should return empty object when not logged in', function(){
    expect(ClassroomStore.getInfo()).to.be.an('object');
  });
  
  it('getToday method should return empty string when not logged in', function(){
    expect(ClassroomStore.getToday()).equal('');
  });

});
