import {
    removeProductFromCart,
    updateMinusProductCount,
    updatePlusProductCount
} from 'apis/cart';
import { useUser } from 'context/user';
import React from 'react';
import { useQueryClient } from 'react-query';
import { CiSquareMinus } from 'react-icons/ci';
import { CiSquarePlus } from 'react-icons/ci';
import { CiTrash } from 'react-icons/ci';
import { FaPlus } from 'react-icons/fa';
import { FaEquals } from 'react-icons/fa';
import Price from 'components/Cart/Price';
import useCart from 'hooks/useCart';

function Cart() {
    const { user } = useUser();

    const { cartQuery } = useCart({ query: true, uid: user?.uid });
    const queryClient = useQueryClient();
    const SHIPPING_FEE = 3000;
    const totalPrice = cartQuery.data.data.reduce(
        (acc, cur) => acc + cur.price * cur.count,
        0
    );

    const handlePlusCount = async (product) => {
        await updatePlusProductCount(user.uid, product);
        queryClient.invalidateQueries(['cart', user.uid]);
    };

    const handleMinusCount = async (product) => {
        await updateMinusProductCount(user.uid, product);
        queryClient.invalidateQueries(['cart', user.uid]);
    };

    const handleRemoveProduct = async (product) => {
        await removeProductFromCart(user.uid, product);
        queryClient.invalidateQueries(['cart', user.uid]);
    };

    return (
        <div className="px-20">
            <div className="text-2xl font-bold text-center py-20 ">
                장바구니
            </div>

            <div className="flex flex-col gap-8 py-12 border-y border-y-gray-500">
                {cartQuery.data.data.map((product) => (
                    <div className="flex">
                        <img
                            src={product.image}
                            alt="product"
                            className="w-300 h-300"
                        />
                        <div className="flex flex-1 items-center justfy-between px-24">
                            <div className="flex-1">
                                <p>{product.title}</p>
                                <p>{product.description}</p>
                                <p className="text-primary">
                                    {product.options}
                                </p>
                                <p>{product.price.toLocaleString()}</p>
                            </div>
                            <div className="flex gap-8">
                                <div className="flex items-center gap-4">
                                    <CiSquareMinus
                                        size={24}
                                        className="cursor-pointer"
                                        onClick={() =>
                                            handleMinusCount(product)
                                        }
                                    />
                                    {product.count}
                                    <CiSquarePlus
                                        size={24}
                                        className="cursor-pointer"
                                        onClick={() => handlePlusCount(product)}
                                    />
                                </div>
                                <CiTrash
                                    size={24}
                                    className="text-primary cursor-pointer"
                                    onClick={() => handleRemoveProduct(product)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-evenly items-center my-20">
                <Price title="총 상품 금액" price={totalPrice} />
                <FaPlus size={32} />
                <Price title="총 상품 금액" price={SHIPPING_FEE} />
                <FaEquals size={32} />
                <Price title="총 상품 금액" price={SHIPPING_FEE + totalPrice} />
            </div>
        </div>
    );
}

export default Cart;
