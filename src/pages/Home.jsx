import { getProducts } from 'apis/products';
import ClothesCard from 'components/Home/ClothesCard';
import Carousel from 'components/ui/Carousel';
import React from 'react';
import { useQuery } from 'react-query';

const images = [
    'https://iso.500px.com/wp-content/uploads/2020/02/Christophe-Josse-Finale-By-Milton-Tan.jpeg',
    'https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2023%2F03%2Fseoul-fashion-week-street-snap-2023-fall-winter-ft2.jpg?w=960&cbr=1&q=90&fit=max',
    'https://fpost.co.kr/board/data/editor/2003/d4bf3e4345bf3dee5d7a04d5a62302e4_1583483898_9116.jpg'
];

function Home() {
    const {
        isLoading,
        error,
        data: products
    } = useQuery(['products'], getProducts);

    return (
        <div>
            <Carousel images={images} />
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error.message}</div>}
            {products && (
                <div className="px-20">
                    <section>
                        <div className="py-20 text-center text-40 font-bold uppercase">
                            <h1>Products</h1>
                        </div>
                        <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-24">
                            {products.map((product, idx) => (
                                <ClothesCard
                                    key={product.id}
                                    clothes={{
                                        image: product.image,
                                        title: product.data.title,
                                        description: product.data.description,
                                        price: product.data.price
                                    }}
                                />
                            ))}
                        </div>
                    </section>
                </div>
            )}
        </div>
    );
}

export default Home;
