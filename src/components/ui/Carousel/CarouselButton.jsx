import React from 'react';
import { cn } from 'utils';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';

function CarouselButton({ children, position, ...rest }) {
    return (
        <button
            {...rest}
            className={cn('absolute p-12 rounded-full bg-gray-500', {
                'left-12': position === 'left',
                'right-12': position === 'right'
            })}
        >
            {position === 'left' && <FaChevronLeft className="text-white" />}
            {position === 'right' && <FaChevronRight className="text-white" />}
        </button>
    );
}

export default CarouselButton;
