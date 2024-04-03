const px0_1000 = { ...Array.from(Array(1000)).map((_, i) => `${i}px`) };
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.jsx'],
    theme: {
        colors: {
            primary: '#F05252',
            white: '#fff',
            gray: {
                100: '#F3F4F6',
                500: '#6B7280'
            }
        },
        extend: {
            fontSize: px0_1000,
            width: px0_1000,
            height: px0_1000,
            maxWidth: px0_1000,
            maxHeight: px0_1000,
            minWidth: px0_1000,
            minHeight: px0_1000,
            spacing: {
                ...px0_1000,
                '1/2': '50%',
                '1/3': '33.333333%'
            },
            borderWidth: px0_1000,
            translate: {
                '1/2': '50%'
            },
            keyframes: {
                show: {
                    '0%': {
                        opacity: 0,
                        transform: 'translateY(300px)'
                    },
                    '35%': {
                        opacity: 0.4,
                        transform: 'translateY(200px)'
                    },
                    '70%': {
                        opacity: 0.8,
                        transform: 'translateY(100px)'
                    },
                    '100%': {
                        opacity: 1,
                        transform: 'translateY(0)'
                    }
                }
            },
            animation: {
                show: 'show 0.5s linear',
                disappear: 'disappear 0.3s ease-in-out'
            }
        }
    },
    plugins: []
};
