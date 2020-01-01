import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCxKMI4a31gvjjfm17b0h9Kxbg_Ckzd-SY',
  authDomain: 'favourcodes.firebaseapp.com',
  databaseURL: 'https://favourcodes.firebaseio.com',
  projectId: 'favourcodes',
  storageBucket: 'favourcodes.appspot.com',
  messagingSenderId: '1035168803182',
  appId: '1:1035168803182:web:2cc71868553ad02ae7397f',
  measurementId: 'G-MQVY0JMR4E',
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
