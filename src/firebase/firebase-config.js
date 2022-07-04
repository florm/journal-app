import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
};

// const firebaseConfig = {
//     apiKey: "AIzaSyBRStvfhiqiRLGfaZHo4uYSkEjkOyMSrYQ",
//     authDomain: "react-app-curso-2a9f6.firebaseapp.com",
//     projectId: "react-app-curso-2a9f6",
//     storageBucket: "react-app-curso-2a9f6.appspot.com",
//     messagingSenderId: "584959905769",
//     appId: "1:584959905769:web:76b883033d42fedfd74578"
// };


// const firebaseConfigTesting = {
//     apiKey: "AIzaSyDvWx206Ou2Uom2XzrjjnxWqlAhHjtassU",
//     authDomain: "react-app-curso-test-df891.firebaseapp.com",
//     projectId: "react-app-curso-test-df891",
//     storageBucket: "react-app-curso-test-df891.appspot.com",
//     messagingSenderId: "609918067230",
//     appId: "1:609918067230:web:218fc2294dee458dd1840f"
// };

// if (process.env.NODE_ENV === 'test') {
//     // Initialize Firebase con configuracion de test
//     firebase.initializeApp(firebaseConfigTesting);
// } else {
//     // Initialize Firebase
//     firebase.initializeApp(firebaseConfig);
// }

//Initialize Firebase con configuracion de test
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore()
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
    db,
    googleAuthProvider,
    firebase
}