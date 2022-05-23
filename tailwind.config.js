const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    mode: "jit", // criar o css necessario somente que o app precisa
    content: ["./src/components/**/*.tsx", "./src/pages/**/*.tsx"],
    darkMode: "class",

    theme: {
        // defaultTheme: {},

        extend: {
            colors: {
                theme: {
                    white: "#FFF",

                    light: {
                        brand: "green",
                        danger: "rgb(239 68 68)",

                        background: {
                            brand: "#E5E5E5",
                            input: "#F9F9FB",
                        },
                        text: {
                            brand: "#0f172a",
                            secondary: "#374151",
                        },
                    },
                },
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/forms"),
        require("tailwind-scrollbar"),
        require("@tailwindcss/line-clamp"),
    ],
};
