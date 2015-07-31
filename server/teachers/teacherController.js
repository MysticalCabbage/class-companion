var demoUtils = require('../utils/demoUtils');

var teacherController = {
 createDemo: function(req, res, next){
    var teacherId = req.body.teacherId;

    demoUtils.generateDemo(teacherId);

    res.end();
    next();
  } 
};

module.exports = teacherController;
