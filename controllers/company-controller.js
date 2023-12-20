'use strict';

const {firestore} = require('./firebase');
const companyCol = firestore.collection('company');

const getAllCompany = async (req, res, next) => {
    try {
        const data = [];
        const snapshot = await companyCol.get();
        snapshot.forEach(doc => {
            console.log(doc.data());
            data.push(doc.data());
        });

        return res.status(200).send({
            'error': false,
            'message': 'Company fetched successfully',
            'data': data
        });
    } catch (err) {
        console.error('Error getting documents', err);
        return res.status(500).send({
            'error': true,
            'message': 'Internal server error'
        });
    }
};

const getCompanyByName = async (req, res, next) => {
    const companyName = req.params.company_name;

    try {
        let data = null;
        const snapshot = await companyCol.where('company_name', '==', companyName).limit(1).get();
        snapshot.forEach(doc => {
            console.log(doc.data());
            data = doc.data();
        });

        if (data === null) {
            return res.status(404).send({
                'error': true,
                'message': `Company '${companyName}' not found`
            });
        }

        return res.status(200).send({
            'error': false,
            'message': 'Company fetched successfully',
            'data': {
                company_name: data.company_name,
            }
        });
    } catch (err) {
        console.error('Error getting documents', err);
        return res.status(500).send({
            'error': true,
            'message': 'Internal server error'
        });
    }
};

module.exports = {
  companyCol,
  getAllCompany,
  getCompanyByName
};