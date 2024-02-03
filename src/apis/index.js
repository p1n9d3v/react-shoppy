import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { app } from './config';
import FireAuth from './fireauth';

const HOST = 'localhost';
const FIRESTORE_PORT = 8080;
const AUTH_PORT = 9099;

const firestore = getFirestore(app);
connectFirestoreEmulator(firestore, 'localhost', 8080);

const auth = getAuth(app);
connectAuthEmulator(auth, 'http://localhost:9099');

export const firebaseAuth = new FireAuth(auth);
