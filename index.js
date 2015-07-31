var app = require('./server/server.js');
 
app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function() {
  console.log('Listening on port: ' + app.get('port'));
});
