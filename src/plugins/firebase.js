import firebase from 'firebase';

// ** 本番環境
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: ''
  })
}

// export const firestore = firebase.firestore();
// export const storage = firebase.storage();
