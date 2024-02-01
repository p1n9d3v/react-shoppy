import React, { useState } from 'react';
import CarouselButton from './CarouselButton';

function Carousel({ images = [] }) {
    const transitionStyle = 'transform 0.5s ease-in-out';
    const [cur, setCur] = useState(1);
    const [transition, setTransition] = useState(transitionStyle);

    const next = () => {
        const newCur = cur + 1;
        setCur(newCur);

        if (newCur === images.length + 1) {
            moveToNthSlide(1);
        }

        setTransition(transitionStyle);
    };

    const prev = () => {
        const newCur = cur - 1;
        setCur(newCur);

        if (newCur === 0) {
            moveToNthSlide(images.length);
        }

        setTransition(transitionStyle);
    };

    const moveToNthSlide = (n) => {
        setTimeout(() => {
            setCur(n);
            setTransition('');
        }, 500);
    };

    return (
        <div>
            <div className="relative w-screen overflow-hidden flex max-h-800">
                {images.length > 0 &&
                    [images[images.length - 1], ...images, images[0]].map(
                        (image, index) => (
                            <div
                                className="grow-0 shrink-0 w-full"
                                style={{
                                    transform: `translateX(-${cur * 100}%)`,
                                    transition
                                }}
                            >
                                <img
                                    key={index}
                                    src={image}
                                    alt={`carousel image ${index}`}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        )
                    )}
                <div className="absolute top-1/2  -translate-y-1/2  h-45 w-full">
                    <CarouselButton onClick={prev} position="left">
                        Prev
                    </CarouselButton>
                    <CarouselButton onClick={next} position="right">
                        Next
                    </CarouselButton>
                </div>
            </div>
        </div>
    );
}

export default Carousel;
