var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, '/src')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(app.get('port'), function() {
  console.log('Listening on port: ' + app.get('port'));
});
