const px0_1000 = { ...Array.from(Array(1000)).map((_, i) => `${i}px`) };
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [],
    theme: {
        extend: {
            fontSize: px0_1000,
            width: px0_1000,
            height: px0_1000,
            maxWidth: px0_1000,
            maxHeight: px0_1000,
            minWidth: px0_1000,
            minHeight: px0_1000,
            spacing: px0_1000,
            borderWidth: px0_1000
        }
    },
    plugins: []
};
