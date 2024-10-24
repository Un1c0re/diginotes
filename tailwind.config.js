/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx,vue}",
    ],
    theme: {
        extend: {
            colors: {
                yellow: {
                    note: "#FCFEB1"
                },
                blue: {
                    note: "#B1D0FE"
                },
                red: {
                    note: "#FEB1B1"
                },
                purple: {
                    note: "#DBCDFF"
                },
            },
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

