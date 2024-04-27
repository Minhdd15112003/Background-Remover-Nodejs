/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["views/**/*.ejs", "views/**/*.html", "public/**/*.css", "public/**/*.html"],
    theme: {
        extend: {},
    },
    plugins: [require("daisyui")],
};
