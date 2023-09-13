// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDNeY8JakZDlnlx9j7nsZ2GzNN9URQ8fnI',
    authDomain: 'moon-cinema-rest-api.firebaseapp.com',
    projectId: 'moon-cinema-rest-api',
    storageBucket: 'moon-cinema-rest-api.appspot.com',
    messagingSenderId: '154369509850',
    appId: '1:154369509850:web:51f1d73f0eede8816ed8e3',
    measurementId: 'G-QJ331BDXDH',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const storage = getStorage(app)

export { storage, storage as default }
