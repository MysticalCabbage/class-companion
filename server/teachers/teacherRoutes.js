var teacherCtrl = require('./teacherController.js');

module.exports = function (app) {
  app.route('/demo')
    .post(teacherCtrl.createDemo);
};
