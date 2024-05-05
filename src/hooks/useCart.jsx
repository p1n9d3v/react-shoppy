import { addProductToCart, getCartProducts } from 'apis/cart';
import { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

function useCart({ query = true, uid }) {
    const queryClient = useQueryClient();
    const cartQuery = useQuery(['cart', uid], () => getCartProducts(uid), {
        enabled: query && !!uid,
        suspense: true
    });

    const cartLength = useMemo(() => {
        if (!uid) return 0;
        return cartQuery.data.data.length;
    }, [cartQuery.data, uid]);

    const addProductToCartMutation = useMutation({
        mutationFn: addProductToCart,
        onSuccess: () => {
            queryClient.invalidateQueries(['cart', uid]);
        }
    });

    return {
        cartQuery,
        cartLength,
        addProductToCartMutation
    };
}

export default useCart;
