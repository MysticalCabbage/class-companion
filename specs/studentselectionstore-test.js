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

  it('should have an addChangeListener method', function(){
    expect(StudentSelectionStore.addChangeListener).to.exist;
  });
  
  it('should have a removeChangeListener method', function(){
    expect(StudentSelectionStore.removeChangeListener).to.exist;
  });

  it('should have a getRandom method', function(){
    expect(StudentSelectionStore.getRandom).to.exist;
  });

  it('should have a getGroup method', function(){
    expect(StudentSelectionStore.getGroup).to.exist;
  });

  it('getRandom method should return a string', function(){
    expect(StudentSelectionStore.getRandom()).to.be.null;
  });
  
  it('getGroup method should return an array', function(){
    expect(StudentSelectionStore.getGroup()).to.be.an('array');
  });  
});
