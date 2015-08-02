/* these options are for travis-ci
production options are to be added to config.js*/
module.exports = {
  firebaseURI: process.env.FIREBASE_URI || 'https://cctest.firebaseio.com/',
  firebaseAdminLogin: process.env.FIREBASE_ADMIN || 'test@test.com',
  firebaseAdminPassword: process.env.FIREBASE_PW || 'test',
  firebaseAdminUid: process.env.FIREBASE_UID || 'simplelogin:1'
};