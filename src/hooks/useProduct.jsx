import { getProducts, addProduct } from 'apis/products';
import { useQuery, useMutation, useQueryClient } from 'react-query';

function useProduct({ query = true }) {
    const queryClient = useQueryClient();
    const productQuery = useQuery(['products'], getProducts, {
        enabled: query,
        suspense: true
    });

    const addProductMutation = useMutation({
        mutationFn: addProduct,
        onSuccess: () => {
            queryClient.invalidateQueries(['products']);
        }
    });

    return {
        productQuery,
        addProductMutation
    };
}

export default useProduct;
