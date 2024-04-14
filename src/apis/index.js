import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { connectDatabaseEmulator, getDatabase } from 'firebase/database';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import { app } from './config';
import FireAuth from './fireauth';
import Firestore from './firestore';

const HOST = 'localhost';
const FIRESTORE_PORT = 8080;
const AUTH_PORT = 9099;

const firestore = getFirestore(app);
connectFirestoreEmulator(firestore, 'localhost', 8080);

const auth = getAuth(app);
connectAuthEmulator(auth, 'http://localhost:9099');

export const realtimeDB = getDatabase(app);
connectDatabaseEmulator(realtimeDB, 'localhost', 9000);

export const storage = getStorage(app);
connectStorageEmulator(storage, 'localhost', 9199);

export const firebaseAuth = new FireAuth(auth);
export const firestoreProducts = new Firestore(firestore, 'products');

export const addProduct = async (data) => {
    const { title, description, categories, options, price } = data;
    return await firestoreProducts.add({
        title,
        description,
        categories,
        options,
        price
    });
};
