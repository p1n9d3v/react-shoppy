import { makeFirestoreCart } from 'apis';

export const addProductToCart = async (uid, product) => {
    const cart = makeFirestoreCart(uid);
    const prevCart = await cart.get();

    const newProduct = {
        ...product,
        count: 1
    };
    if (!prevCart) {
        return await cart.set({
            data: [newProduct]
        });
    } else {
        const isProductInCart = prevCart.data.some(
            (item) =>
                item.title === product.title && item.options === product.options
        );

        if (isProductInCart) {
            const newCart = prevCart.data.map((item) => {
                if (
                    item.title === product.title &&
                    item.options === product.options
                ) {
                    return {
                        ...item,
                        count: item.count + 1
                    };
                }
                return item;
            });
            return await cart.set({
                data: newCart
            });
        }

        return await cart.set({
            data: [...prevCart.data, newProduct]
        });
    }
};

export const getCartProducts = async (uid) => {
    const cart = makeFirestoreCart(uid);
    return await cart.get();
};

export const updatePlusProductCount = async (uid, product) => {
    const cart = makeFirestoreCart(uid);
    const prevCart = await cart.get();
    const newCart = prevCart.data.map((item) => {
        if (item.title === product.title && item.options === product.options) {
            return {
                ...item,
                count: item.count + 1
            };
        }
        return item;
    });

    return await cart.set({
        data: newCart
    });
};

export const updateMinusProductCount = async (uid, product) => {
    const cart = makeFirestoreCart(uid);
    const prevCart = await cart.get();
    const newCart = prevCart.data.map((item) => {
        if (item.title === product.title && item.options === product.options) {
            return {
                ...item,
                count: item.count - 1 < 0 ? 0 : item.count - 1
            };
        }
        return item;
    });

    return await cart.set({
        data: newCart
    });
};

export const removeProductFromCart = async (uid, product) => {
    const cart = makeFirestoreCart(uid);
    const prevCart = await cart.get();
    const newCart = prevCart.data.filter(
        (item) =>
            item.title !== product.title || item.options !== product.options
    );
    return await cart.set({
        data: newCart
    });
};
