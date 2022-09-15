// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getAuth} from "firebase/auth";
import {GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsimojrGJ2chAOhvqmoKnHCrJ4gBLFMG8",
  // authDomain: "localhost",
  authDomain: "pokertracker-23081.firebaseapp.com",
  projectId: "pokertracker-23081",
  storageBucket: "pokertracker-23081.appspot.com",
  messagingSenderId: "823324556260",
  appId: "1:823324556260:web:9cfba9f7720ab76bc5e5f1",
  measurementId: "G-MFCWQFRM42"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
const authGoogle = new GoogleAuthProvider();

export default firebaseApp;
export {analytics, auth, authGoogle};