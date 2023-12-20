'use strict';

const {firestore} = require('./firebase');
const jobCol = firestore.collection('jobs');
// const models = require('../data/saved-jobs');
const savedJobsCol = firestore.collection('saved_jobs');

const getAllJob = async (req, res, next) => {
    try {
        const data = [];
        const snapshot = await jobCol.get();
        snapshot.forEach(doc => {
            console.log(doc.data());
            data.push(doc.data());
        });

        return res.status(200).send({
            'error': false,
            'message': 'Job fetched successfully',
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

const getJobByName = async (req, res, next) => {
    const jobName = req.params.job_title;

    try {
        let data = null;
        const snapshot = await jobCol.where('job_title', '==', jobName).limit(1).get();
        snapshot.forEach(doc => {
            console.log(doc.data());
            data = doc.data();
        });

        if (data === null) {
            return res.status(404).send({
                'error': true,
                'message': `Job '${jobName}' not found`
            });
        }

        return res.status(200).send({
            'error': false,
            'message': 'Job fetched successfully',
            'data': {
                job_title: data.job_title, 
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

const saveJobRecom = async (req, res, next) => {
    const jobName = req.body.job_title;
    const userId = req.body.user_id; // ID pengguna dari aplikasi seluler

    try {
        // Mencari data pekerjaan berdasarkan nama pekerjaan
        const snapshot = await jobCol.where('job_title', '==', jobName).limit(1).get();
        let data = null;
        
        // Mengambil data pekerjaan dari hasil pencarian
        snapshot.forEach(doc => {
            data = doc.data();
        });

        // Jika data pekerjaan tidak ditemukan, kirim respons 404
        if (data === null) {
            return res.status(404).send({
                'error': true,
                'message': `Job '${jobName}' not found`
            });
        }

        // Simpan data pekerjaan ke dalam koleksi 'saved_jobs' untuk pengguna dengan ID tertentu
        const saveResult = await savedJobsCol.doc(userId).collection('jobs').add(data);

        // Jika penyimpanan berhasil, kirim respons 200
        if (saveResult) {
            return res.status(200).send({
                'error': false,
                'message': 'Job saved successfully',
                'data': {
                    job_title: data.job_title,
                }
            });
        } else {
            // Jika terjadi kesalahan saat menyimpan, kirim respons 500
            return res.status(500).send({
                'error': true,
                'message': 'Error saving job'
            });
        }
    } catch (err) {
        // Tangani kesalahan internal server
        console.error('Error saving job recommendation', err);
        return res.status(500).send({
            'error': true,
            'message': 'Internal server error'
        });
    }
};

const unsaveJobRecom = async (req, res, next) => {
    const jobName = req.body.job_title;
    const userId = req.body.user_id;

    try {
        // Mencari data pekerjaan berdasarkan nama pekerjaan
        const snapshot = await jobCol.where('job_title', '==', jobName).limit(1).get();
        let data = null;

        // Mengambil data pekerjaan dari hasil pencarian
        snapshot.forEach(doc => {
            data = doc.data();
        });

        // Jika data pekerjaan tidak ditemukan, kirim respons 404
        if (data === null) {
            return res.status(404).send({
                'error': true,
                'message': `Job '${jobName}' not found`
            });
        }

        // Hapus data pekerjaan dari koleksi 'saved_jobs' untuk pengguna dengan ID tertentu
        const savedJobRef = savedJobsCol.doc(userId).collection('jobs');
        const querySnapshot = await savedJobRef.where('job_title', '==', data.job_title).limit(1).get();

        querySnapshot.forEach(async (doc) => {
            await savedJobRef.doc(doc.id).delete();
        });

        // Kirim respons 200 jika penghapusan berhasil
        return res.status(200).send({
            'error': false,
            'message': 'Job unsaved successfully',
            'data': {
                job_title: data.job_title,
            }
        });
    } catch (err) {
        // Tangani kesalahan internal server
        console.error('Error unsaving job recommendation', err);
        return res.status(500).send({
            'error': true,
            'message': 'Internal server error'
        });
    }
};

module.exports = {
  jobCol,
  savedJobsCol,
    getAllJob,
    getJobByName,
    saveJobRecom,
    unsaveJobRecom
};