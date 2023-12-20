'use strict';

// const firebaseConfig = require('../firebase_config');
const {firestore} = require('./firebase');
const models = require('../data/user-data');
const userDataCol = firestore.collection('users-data');

const addUserData = async (req, res, next) => {
  try {
    const data = req.body;
    await userDataCol.add(data);
    
    return res.status(200).send({
      'error': false,
      'message': 'User data added successfully',
      'data': data
    });
  } catch (error) {
    console.error('Error adding user data:', error);
    return res.status(400).send({
      'error': true,
      'message': 'Error adding user data'
    });
  }
};

const getAllUserData = async (req, res, next) => {
  try {
    let data = [];
    const querySnapshot = await userDataCol.get();

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      data.push(doc.data());
    });

    return res.status(200).send({
      'error': false,
      'message': 'User data fetched successfully',
      'data': data
    });
  } catch (error) {
    console.error('Error getting user data:', error);
    return res.status(400).send({
      'error': true,
      'message': 'Error getting user data'
    });
  }
};

const updateUserData = async (req, res, next) => {
  try {
    const userId = req.params.userId; // Assuming you have a parameter for the user ID
    const newData = req.body;
    // console.log('User ID:', userId);

    // Update the user data in the Firestore collection
    await userDataCol.doc(userId).set(newData, { merge: true });

    return res.status(200).send({
      'error': false,
      'message': 'User data updated successfully',
      'data': newData
    });
  } catch (error) {
    console.error('Error updating user data:', error);
    return res.status(400).send({
      'error': true,
      'message': 'Error updating user data',
      // 'details': error.message
    });
  }
};

// Export the functions and collection
module.exports = {
  addUserData,
  getAllUserData,
  updateUserData,
  userDataCol
};