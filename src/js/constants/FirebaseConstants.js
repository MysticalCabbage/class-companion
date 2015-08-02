var FirebaseConstants = {
  URI: (process.env.NODE_ENV === 'production') ? 
    'https://mysticalcabbage2.firebaseio.com/' : 
    'https://cctest.firebaseio.com/'
};

module.exports = FirebaseConstants;
