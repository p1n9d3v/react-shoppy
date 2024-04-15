import { storage } from './index';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export async function uploadToStorage(file, path) {
    const storageRef = ref(storage, path);

    const result = await uploadBytes(storageRef, file);

    return result;
}

export async function getUrlFromStorage(path) {
    const storageRef = ref(storage, path);

    const url = await getDownloadURL(storageRef);

    return url;
}
