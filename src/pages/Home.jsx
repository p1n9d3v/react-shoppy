import ClothesCard from 'components/Home/ClothesCard';
import Carousel from 'components/ui/Carousel';
import React from 'react';

const images = [
    'https://iso.500px.com/wp-content/uploads/2020/02/Christophe-Josse-Finale-By-Milton-Tan.jpeg',
    'https://images.unsplash.com/photo-1531685250784-7569952593d2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
];

function Home() {
    return (
        <div>
            <Carousel images={images} />
            <div className="px-20">
                <section>
                    <div className="py-20 text-center text-40 font-bold uppercase">
                        <h1>Products</h1>
                    </div>
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-24">
                        {Array(30)
                            .fill(0)
                            .map((_, i) => (
                                <ClothesCard
                                    clothes={{
                                        image: 'data:image/jpeg;base64,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',
                                        title: 'T-shirt',
                                        description:
                                            'This is a t-shirtThis is a t-shirtThis is a t-shirtThis is a t-shirtThis is a t-shirtThis is a t-shirtThis is a t-shirtThis is a t-shirtThis is a t-shirtThis is a t-shirtThis is a t-shirtThis is a t-shirtThis is a t-shirt',
                                        price: '100000'
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
