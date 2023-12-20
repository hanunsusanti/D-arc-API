const express = require('express');
const { getAllCompany, getCompanyByName} = require('../controllers/company-controller');

const router = express.Router();

router.get('/getAllCompany', getAllCompany);
router.get('/getCompanyByName/:company_name', getCompanyByName);

module.exports = {
    routes: router
} 