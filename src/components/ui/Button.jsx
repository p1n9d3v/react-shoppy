import React from 'react';
import { cn } from '../../utils';

function Button({ children, size = 'full', tw = '' }) {
    const styles = {
        sizes: {
            full: 'py-14 w-full',
            lg: 'text-lg',
            md: 'text-md',
            sm: 'text-sm'
        }
    };
    return (
        <button
            className={cn([
                'bg-primary text-white rounded-md py-14 px-24',
                styles.sizes[size],
                tw
            ])}
        >
            {children}
        </button>
    );
}

export default Button;
