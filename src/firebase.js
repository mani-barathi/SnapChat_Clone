import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyByVek7Xer_luE2RcHDbMs6vPWqIM9WcvI",
    authDomain: "snapchat-clone-ffea1.firebaseapp.com",
    projectId: "snapchat-clone-ffea1",
    storageBucket: "snapchat-clone-ffea1.appspot.com",
    messagingSenderId: "511908134741",
    appId: "1:511908134741:web:147f83c3857223784479dc"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
export const db = firebaseApp.firestore()
export const storage = firebaseApp.storage()
export const auth = firebaseApp.auth()
export const provider = new firebase.auth.GoogleAuthProvider()
