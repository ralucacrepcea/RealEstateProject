import * as firebase from 'firebase'

import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAodfCUEmq0t18QNlbwuhFxw5RY3LhTMaE",
  authDomain: "realestateproject-a07dd.firebaseapp.com",
  projectId: "realestateproject-a07dd",
  storageBucket: "realestateproject-a07dd.firebasestorage.app",
  messagingSenderId: "330138017115",
  appId: "1:330138017115:web:28fdfbc68e86f5f13d8e7e"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, db, storage, googleProvider }