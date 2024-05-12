/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.tsx"
    ],
    theme: {     
        extend: {
            width: {
                '40': '10rem',
            },  
            fontSize: {
                'h1': ['2.5rem', { lineHeight: '1.2' }],
                'h2': ['1.875rem', { lineHeight: '1.3' }],
            }            
        },
    },
    plugins: [
        require("daisyui")
    ],
}