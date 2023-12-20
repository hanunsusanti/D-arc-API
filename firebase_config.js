const firebase = require ('firebase/app');
const config = require ('./config');

const firebase_config = firebase.initializeApp(config.firebaseConfig);

module.exports = firebase_config;