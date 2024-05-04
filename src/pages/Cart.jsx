import { getCartProducts } from 'apis/cart';
import { useUser } from 'context/user';
import React from 'react';
import { useQuery } from 'react-query';
import { CiSquareMinus } from 'react-icons/ci';
import { CiSquarePlus } from 'react-icons/ci';
import { CiTrash } from 'react-icons/ci';

function Cart() {
    const { user } = useUser();
    const { data: cart } = useQuery(
        ['cart', user?.uid],
        () => getCartProducts(user?.uid),
        {
            enable: !!user,
            suspense: true
        }
    );

    return (
        <div className="px-20">
            <div className="text-2xl font-bold text-center py-20 ">
                장바구니
            </div>

            <div className="flex flex-col gap-8 py-12 border-y border-y-gray-500">
                {cart &&
                    cart.data.map((product) => (
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
                                        <CiSquareMinus size={24} />
                                        0
                                        <CiSquarePlus size={24} />
                                    </div>
                                    <CiTrash
                                        size={24}
                                        className="text-primary"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default Cart;
