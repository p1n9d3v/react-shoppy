import { getProducts } from 'apis/products';
import { getUrlFromStorage } from 'apis/storage';
import ClothesCard from 'components/Home/ClothesCard';
import Carousel from 'components/ui/Carousel';
import React, { useState } from 'react';
import { useEffect } from 'react';

const images = [
    'https://iso.500px.com/wp-content/uploads/2020/02/Christophe-Josse-Finale-By-Milton-Tan.jpeg',
    'https://images.unsplash.com/photo-1531685250784-7569952593d2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        (async () => {
            const data = await getProducts();
            setProducts(data);
        })();
    }, []);

    return (
        <div>
            <Carousel images={images} />
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
        </div>
    );
}

export default Home;
