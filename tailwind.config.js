/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}", // Ensures all relevant files in src are scanned
    ],
    theme: { extend: {} },
    plugins: [],
}