/** @type {import('tailwindcss').Config} */
export const content = [
    "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
    extend: {
        keyframes: {
            shake: {
                '0%, 100%': { transform: 'translateX(0)' },
                '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
                '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
            },
            'burst-out': {
                '0%': { transform: 'scale(0.5)', opacity: '1' },
                '100%': { transform: 'scale(1.5)', opacity: '0' },
            }
        },
        animation: {
            shake: 'shake 0.5s ease-in-out',
            'burst-out': 'burst-out 0.4s ease-out forwards',
        },
    },
};
export const plugins = [];