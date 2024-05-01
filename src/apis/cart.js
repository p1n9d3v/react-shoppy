import { makeFirestoreCart } from 'apis';

export const addProductToCart = async (uid, product) => {
    const cart = makeFirestoreCart(uid);
    return await cart.set(product);
};
