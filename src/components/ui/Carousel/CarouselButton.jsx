import React from 'react';
import { cn } from 'utils';
import { FaChevronLeft } from 'react-icons/fa';
import { FaChevronRight } from 'react-icons/fa';

function CarouselButton({ children, position, ...rest }) {
    return (
        <button
            {...rest}
            className={cn(
                'absolute p-12 rounded-full bg-gray-100 hover:bg-gray-500 group',
                {
                    'left-12': position === 'left',
                    'right-12': position === 'right'
                }
            )}
            aria-label={position === 'left' ? 'prev' : 'next'}
        >
            {position === 'left' && (
                <FaChevronLeft className="text-black group-hover:text-white" />
            )}
            {position === 'right' && (
                <FaChevronRight className="text-black group-hover:text-white" />
            )}
        </button>
    );
}

export default CarouselButton;
