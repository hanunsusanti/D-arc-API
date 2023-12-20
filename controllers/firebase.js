const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');
const firebaseConfig = require('../firebase_config');

// Check if the app is already initialized
try {
  if (!admin.apps.length) {
    // Initialize Firebase Admin
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      ...firebaseConfig,
    });
  }
} catch (error) {
  console.error('Error initializing Firebase Admin:', error);
}

const firestore = admin.firestore();

module.exports = {
  firestore,
};
