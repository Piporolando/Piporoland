// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyCdtKO3fzQHQhB2TS2uxkAfjG0ZTLUvwPg",
  authDomain: "alef-cc3b1.firebaseapp.com",
  projectId: "alef-cc3b1",
  storageBucket: "alef-cc3b1.appspot.com",
  messagingSenderId: "904403492316",
  appId: "1:904403492316:web:ae38ce6794e76018330319"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

