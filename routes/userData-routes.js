const express = require('express');
const { addUserData, getAllUserData, updateUserData } = require('../controllers/userData-controller');

const router = express.Router();

router.post('/addUserData', addUserData);
router.get('/getUserData', getAllUserData);
router.put('/updateUserData/:userId', updateUserData);

module.exports = {
    routes: router
}