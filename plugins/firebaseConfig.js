import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'
// import 'firebase/storageRef'

// Initialize Cloud Firestore through Firebase
if (!firebase.apps.length) {
  const firebaseConfig = {
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional

    apiKey: 'AIzaSyB8EmnQIw6K5Qf7UU8uyDJI1ahGTR0G4fI',
    authDomain: 'test-login-53a39.firebaseapp.com',
    databaseURL: 'https://test-login-53a39-default-rtdb.firebaseio.com',
    projectId: 'test-login-53a39',
    storageBucket: 'test-login-53a39.appspot.com',
    messagingSenderId: '314325999181',
    appId: '1:314325999181:web:05eba4b9832dacc6e4c604',
    measurementId: 'G-8RV72T2M78',
  }
  firebase.initializeApp(firebaseConfig)
}

// export const storageRef = storage.ref();

export const storage = firebase.storage()

export const db = firebase.firestore()
export const auth = firebase.auth()
