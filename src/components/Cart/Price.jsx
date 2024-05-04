import React from 'react';

function Price({ title, price }) {
    return (
        <div className="text-center bg-gray-100 rounded-xl px-24 py-32 w-fit">
            <p className="text-2xl font-bold">{title}</p>
            <p className="text-xl text-primary">￦ {price.toLocaleString()}</p>
        </div>
    );
}

export default Price;
