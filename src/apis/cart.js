import { makeFirestoreCart } from 'apis';

export const addProductToCart = async (uid, product) => {
    const cart = makeFirestoreCart(uid);
    const prevCart = await cart.get();

    return await cart.set({
        data: prevCart ? [...prevCart.data, product] : [product]
    });
};

export const getCartProducts = async (uid) => {
    const cart = makeFirestoreCart(uid);
    return await cart.get();
};
