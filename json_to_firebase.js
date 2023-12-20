const { firestore } = require('./controllers/firebase');
const jobJSON = require('./data/job.json');
const companyJSON = require('./data/company.json');

const addJobsToFirestore = async () => {
    try {
      const batch = firestore.batch();
  
      jobJSON.jobs.forEach((jobJSON) => {
        const newJobRef = firestore.collection('jobs').doc();
        batch.set(newJobRef, jobJSON);
      });
  
      await batch.commit();
  
      console.log('Jobs added to Firestore successfully.');
    } catch (error) {
      console.error('Error adding jobs to Firestore:', error);
    }
  };

const addCompaniesToFirestore = async () => {
  try {
    const batch = firestore.batch();

    companyJSON.company.forEach((companyJSON) => {
      const newCompanyRef = firestore.collection('company').doc();
      batch.set(newCompanyRef, companyJSON);
    });

    await batch.commit();

    console.log('company added to Firestore successfully.');
  } catch (error) {
    console.error('Error adding company to Firestore:', error);
  }
};
  
  // Run the function to add company to Firestore
  addJobsToFirestore();
  addCompaniesToFirestore();