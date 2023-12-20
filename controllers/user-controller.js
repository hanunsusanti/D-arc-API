'use strict';

const {firestore} = require('./firebase');
const models = require('../data/user');

const userCol = firestore.collection('users');
const bcrypt = require('bcrypt');

const generateUniqueId = () => {
  return 'user_' + Math.floor(Math.random() * 1000000);
};

const addUser = async (req, res, next) => {
  const data = req.body;
  let usernameExist = false;

  try {
    const querySnapshot = await userCol.where('username', '==', data.username).limit(1).get();

    querySnapshot.forEach((doc) => {
      usernameExist = true;
    });

    if (usernameExist) {
      return res.status(400).send({
        'error': true,
        'message': 'Username already registered',
      });
    }

    // Generate user_id
    const user_id = generateUniqueId();

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    data.user_id = user_id;

    await userCol.add(data);

    console.log('User registered');
    return res.status(200).send({
      'error': false,
      'message': 'add User success',
      'user_id': user_id, 
    });
  } catch (error) {
    console.error('Error adding user:', error);
    return res.status(400).send({
      'error': true,
      'message': 'Error adding user',
    });
  }
};

// const register = async (req, res, next) => {
//   const user = {
//     username: req.body.username,
//     email: req.body.email,
//     phone_number: req.body.phone_number,
//     password: req.body.password,
//     emailVerified: false,
//     disable: false,
//   };

//   try {
//     const userRecord = await admin.auth().createUser(user);
//     console.log('Successfully created new user:', userRecord.uid);
//     return res.status(200).send({
//       'error': false,
//       'message': 'User register success',
//       'uid': userRecord.uid,
//     });
//   } catch (error) {
//     console.error('Error creating new user:', error);
//     return res.status(400).send({
//       'error': true,
//       'message': 'Error creating new user',
//     });
//   }
// };

const login = async (req, res, next) => {
    const reqUser = {
      username: req.body.username,
      password: req.body.password,
    };

    let usernameExist = false;
  
    try {
      // Assuming you have a custom user collection in Firestore
    
      const querySnapshot = await userCol.where('username', '==', reqUser.username).limit(1).get();

      querySnapshot.forEach((doc) => {
        usernameExist = true;
      });
  
      if (usernameExist) {
        return res.status(200).send({
          'error': false,
          'message': 'successfully logged in',
        });
      }
      const userData = userDoc.data();
  
      // Validate the password (You should use a more secure method, like bcrypt)
      if (userData.password !== reqUser.password) {
        return res.status(400).send({
          'error': true,
          'message': 'Invalid password',
        });
      }
  
      return res.status(200).send({
        'error': false,
        'message': 'Successfully logged in.',
        'user': userData,
      });
    } catch (error) {
      console.error('Error signing in:', error);
      return res.status(400).send({
        'error': true,
        'message': 'Error signing in',
      });
    }
  };
  
  

module.exports = {
  addUser,
  login,
  userCol,
};
