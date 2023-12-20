const express = require('express');
const { getAllJob, getJobByName, saveJobRecom, unsaveJobRecom} = require('../controllers/job-controller');

const router = express.Router();

router.get('/getAllJob', getAllJob);
router.get('/getJobByName/:job_title', getJobByName);
router.post('/saveJob', saveJobRecom);
router.delete('/unsaveJob', unsaveJobRecom)

module.exports = {
    routes: router
} 