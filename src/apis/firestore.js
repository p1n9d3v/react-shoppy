import {
    setDoc,
    getDoc,
    collection,
    updateDoc,
    deleteField,
    deleteDoc
} from 'firebase/firestore';
import { doc } from 'firebase/firestore';

class Firestore {
    #db;
    #ref;

    constructor(firestore, path) {
        if (!path.length) {
            throw new Error('invalid path');
        }
        this.#db = firestore;
        this.#ref = this.#getRef(path);
    }

    #getRef(path) {
        const pathArr = path.split('/');
        if (path.startsWith('/')) {
            pathArr.shift();
        }

        if (pathArr.length % 2 === 0) {
            return doc(this.#db, ...pathArr);
        }

        return doc(collection(this.#db, ...pathArr));
    }

    async get() {
        const snap = await getDoc(this.#ref);
        return snap.data();
    }

    async set(data) {
        await setDoc(this.#ref, data);
    }

    async update(data) {
        await updateDoc(this.#ref, data);
    }

    async delete() {
        await deleteDoc(this.#ref);
    }

    async deleteField(field) {
        await updateDoc(this.#ref, {
            [field]: deleteField()
        });
    }
}

export default Firestore;
