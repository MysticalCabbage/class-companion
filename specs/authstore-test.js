var TestUtils = require('react/addons').TestUtils;
var AuthStore = require('../src/js/stores/AuthStore');
var AppDispatcher = require('../src/js/dispatcher/AppDispatcher');

describe("AuthStore", function() {

  beforeEach(function(){
  });

  afterEach(function(){
  });

  it("should be an object", function() {
    expect(AuthStore).to.be.an('object');
  });

  it('should have an addChangeListener method', function(){
    expect(AuthStore.addChangeListener).to.exist;
  });
  
  it('should have a removeChangeListener method', function(){
    expect(AuthStore.removeChangeListener).to.exist;
  });

  it('should have a logout method', function(){
    expect(AuthStore.logout).to.exist;
  });

  it('should have a loggedIn method', function(){
    expect(AuthStore.loggedIn).to.exist;
  });
  
  it('should have a checkAuth method', function(){
    expect(AuthStore.checkAuth).to.exist;
  });

  it('loggedIn method should return null when not logged in', function(){
    expect(AuthStore.loggedIn()).to.be.null
  });

  it('checkAuth method should return null when not logged in', function(){
    expect(AuthStore.checkAuth()).to.be.null;
  });

});
