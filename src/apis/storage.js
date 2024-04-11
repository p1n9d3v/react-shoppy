import { storage } from './index';
import { ref, uploadBytes } from 'firebase/storage';

export async function uploadToStorage(file, path) {
    const storageRef = ref(storage, path);

    const result = await uploadBytes(storageRef, file);

    return result;
}
