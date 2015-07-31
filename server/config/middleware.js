var bodyParser = require('body-parser');
var path = require('path');

module.exports = function(app, express){

  var teacherRouter = express.Router();

  app.use(express.static(path.join(__dirname, '../../dist')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.use('/api/teacher', teacherRouter);
  require('../teachers/teacherRoutes.js')(teacherRouter);

  require('./firebaseRef.js');
};
