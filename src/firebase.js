import firebase from 'firebase';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP__STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

let firebaseCache;

// Initialize Firebase
export const getFirebase = () => {
  if (firebaseCache) {
    return firebaseCache;
  }
  firebase.initializeApp(firebaseConfig);
  firebaseCache = firebase;
  return firebase;
};
