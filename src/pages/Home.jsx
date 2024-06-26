import ClothesCard from 'components/Home/ClothesCard';
import Carousel from 'components/ui/Carousel';
import useProduct from 'hooks/useProduct';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const images = [
    'https://iso.500px.com/wp-content/uploads/2020/02/Christophe-Josse-Finale-By-Milton-Tan.jpeg',
    'https://image-cdn.hypb.st/https%3A%2F%2Fkr.hypebeast.com%2Ffiles%2F2023%2F03%2Fseoul-fashion-week-street-snap-2023-fall-winter-ft2.jpg?w=960&cbr=1&q=90&fit=max',
    'https://fpost.co.kr/board/data/editor/2003/d4bf3e4345bf3dee5d7a04d5a62302e4_1583483898_9116.jpg'
];

function Home() {
    const { productQuery } = useProduct({ query: true });

    const navigate = useNavigate();

    return (
        <div>
            <Carousel images={images} />
            {productQuery.data && (
                <div className="px-20">
                    <section>
                        <div className="py-20 text-center text-40 font-bold uppercase">
                            <h1>Products</h1>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-24">
                            {productQuery.data.map((product, idx) => (
                                <ClothesCard
                                    key={product.id}
                                    clothes={{
                                        image: product.image,
                                        title: product.data.title,
                                        description: product.data.description,
                                        price: product.data.price
                                    }}
                                    onClick={() =>
                                        navigate(`/products/${product.id}`, {
                                            state: { product }
                                        })
                                    }
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
