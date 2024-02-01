const px0_1000 = { ...Array.from(Array(1000)).map((_, i) => `${i}px`) };
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.jsx'],
    theme: {
        colors: {
            primary: '#F05252',
            white: '#fff',
            gray: {
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
            }
        }
    },
    plugins: []
};
