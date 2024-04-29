import React from 'react';

function ClothesCard({ clothes, onClick }) {
    const { image, title, price, description } = clothes;
    return (
        <div
            className="w-full h-full overflow-hidden flex flex-col rounded-md shadow-lg animate-show hover:scale-105 transition ease-in-out cursor-pointer"
            onClick={onClick}
            style={{
                animationTimeline: 'view()',
                animationRange: 'entry 5% cover 20%'
            }}
        >
            <img src={image} alt={image} className="basis-h-200" />

            <div className="px-8 py-12 flex flex-col gap-12 flex-1">
                <div className="text-24 font-semibold">{title}</div>
                <div className="line-clamp-3 h-full">{description}</div>
                <div className="self-end text-32 font-bold">
                    ${parseInt(price).toLocaleString()}
                </div>
            </div>
        </div>
    );
}

export default ClothesCard;
