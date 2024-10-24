/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,vue}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                'dot-pattern': 'radial-gradient(circle, #d3d3d3 1px, transparent 2px)',
            },
            backgroundSize: {
                'dot-pattern': '30px 30px',
            },
        },
    },
    plugins: [],
}

