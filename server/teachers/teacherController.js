var demoUtils = require('../utils/demoUtils');
var firebaseRef = require('../config/firebaseRef').firebaseRef;
var Q = require('q');

var teacherController = {

 createDemo: function(req, res, next){
    //console.log(req.body); //contains {teacherId: teacherId}
    var demoClassObj = { classTitle: 'demo', cool: 'demo', info: 'info' };

    var demoClassId = firebaseRef.child(
      '/teachers/'
      + req.body.teacherId
      + '/classes'
    ).push(demoClassObj).key();

    demoClassObj.classId = demoClassId;

    firebaseRef.child(
      'classes/'
      + demoClassId
    ).set(demoClassObj);

    res.end();
    next();
  } 
};

module.exports = teacherController;
