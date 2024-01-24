// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import {
    getAuth,
    connectAuthEmulator,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const firestore = getFirestore(app);
connectFirestoreEmulator(firestore, 'localhost', 8080);

const auth = getAuth(app);
connectAuthEmulator(auth, 'http://localhost:9099');

export const loginGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return new Promise((resolve, reject) => {
        signInWithPopup(auth, googleProvider)
            .then((result) => {
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                resolve({
                    token,
                    user
                });
            })
            .catch((error) => {
                console.log(error);
            });
    });
};

export const logoutGoogle = () => {
    signOut(auth);
};

export const observeAuthState = () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            resolve(user);
        });
    });
};
