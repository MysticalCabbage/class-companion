/* these options are for travis-ci
production options are to be added to config.js*/
module.exports = {
  firebaseURI: process.env.FIREBASE_URI || 'https://cctest.firebaseio.com/',
  firebaseSECRET: process.env.FIREBASE_SECRET || 'ZCAC6cOKHAGTQHNC0D8v0Pt9aTI5isILJQt47jm3'
};
