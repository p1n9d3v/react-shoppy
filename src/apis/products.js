import { firestoreProducts } from 'apis';
import { getUrlFromStorage } from './storage';

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
