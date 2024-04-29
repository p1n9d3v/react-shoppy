import { getProduct } from 'apis/products';
import Button from 'components/ui/Button';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    const { id } = useParams();

    const {
        isLoading,
        error,
        data: product
    } = useQuery(['product', id], () => getProduct(id), {
        suspense: true
    });

    const handleAddToCart = (e) => {
        e.preventDefault();
        const options = e.target.options.value;
        console.log(options);
    };

    return (
        <div className="flex gap-20 px-20">
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
                    <Button type="submit" tw="mt-20">
                        장바구니 담기
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default ProductDetail;
