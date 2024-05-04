import { addProductToCart } from 'apis/cart';
import { getProduct } from 'apis/products';
import Button from 'components/ui/Button';
import React from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { useUser } from 'context/user';
import { IoIosCheckbox } from 'react-icons/io';

function ProductDetail() {
    const { id } = useParams();
    const { user } = useUser();
    const [successAddToCart, setSuccessAddToCart] = React.useState(false);
    const { data: product } = useQuery(['product', id], () => getProduct(id), {
        suspense: true
    });
    const queryClient = useQueryClient();

    const handleAddToCart = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('로그인이 필요합니다.');
            return;
        }

        const option = e.target.options.value;
        const productData = {
            ...product,
            options: option
        };

        try {
            await addProductToCart(user.uid, productData);
            setSuccessAddToCart(true);
        } catch (e) {
            setSuccessAddToCart(false);
        } finally {
            queryClient.invalidateQueries(['carts', user.uid]);
        }
    };

    return (
        <div className="flex gap-20 px-20 max-lg:flex-col">
            <div className="flex-1">
                <img src={product.image} alt={'product image'} />
            </div>
            <div className="flex flex-1 flex-col">
                <div>
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <div className="text-xl">₩ {product.price}</div>
                    <div className="border border-t my-8"></div>
                    <div>{product.description}</div>
                </div>

                <form onSubmit={handleAddToCart}>
                    <div className="flex flex-col my-20">
                        <label
                            htmlFor="options"
                            className="uppercase font-bold"
                        >
                            options
                        </label>
                        <select
                            id="options"
                            className="p-4 border-4 border-dotted border-primary"
                            defaultValue={product.options[0]}
                        >
                            {product.options.map((option, idx) => (
                                <option key={`${option}-${idx}`} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    {successAddToCart && (
                        <div className="flex items-center gap-4">
                            <IoIosCheckbox size={24} className="text-primary" />
                            장바구니에 추가되었습니다.
                        </div>
                    )}
                    <Button type="submit" tw="mt-20">
                        장바구니 담기
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default ProductDetail;
