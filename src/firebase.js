import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyCR70cdJ0M5bT-t8noggZUGNtRZ5IciO0c",
    authDomain: "discord-clone-85cc9.firebaseapp.com",
    databaseURL: "https://discord-clone-85cc9.firebaseio.com",
    projectId: "discord-clone-85cc9",
    storageBucket: "discord-clone-85cc9.appspot.com",
    messagingSenderId: "823054886799",
    appId: "1:823054886799:web:22bd553b9d1226b8ba0dfa"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db