import { firestoreProducts, makeFirestoreProduct } from 'apis';
import Firestore from './firestore';
import { getUrlFromStorage, uploadToStorage } from './storage';

export const addProduct = async (data) => {
    const { title, description, categories, options, price, file } = data;
    const addProductMetaResult = await firestoreProducts.add({
        title,
        description,
        categories,
        options,
        price
    });
    await uploadToStorage(
        file,
        `products/${addProductMetaResult.id}.${file.type.split('/')[1]}`
    );
};

export const getProducts = async () => {
    const products = await firestoreProducts.getAll();
    return Promise.all(
        products.map(async (product) => {
            const image = await getUrlFromStorage(
                `products/${product.id}.webp`
            );
            return {
                id: product.id,
                data: product.data,
                image
            };
        })
    );
};

export const getProduct = async (id) => {
    const firestoreProduct = makeFirestoreProduct(id);
    const product = await firestoreProduct.get();
    const image = await getUrlFromStorage(`products/${id}.webp`);

    return {
        ...product,
        image
    };
};
