// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const apiKey: string = process.env.FIREBASE_API_KEY ?? "";
const authDomain: string = process.env.FIREBASE_AUTH_DOMAIN ?? "";
const projectId = process.env.FIREBASE_PROJECT_ID ?? "";
const storageBucket: string = process.env.FIREBASE_STORAGE_BUCKET ?? "";
const senderId: string = process.env.FIREBASE_MESSENING_SENDER_ID ?? "";
const appId = process.env.FIREBASE_APP_ID ?? "";
const measurementId = process.env.FIREBASE_MEASUREMENT_ID ?? "";

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: senderId,
  appId: appId,
  measurementId: measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, storage as default };
