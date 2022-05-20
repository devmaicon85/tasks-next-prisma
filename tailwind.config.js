const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    mode: "jit", // criar o css necessario somente que o app precisa
    content: ["./src/components/**/*.tsx", "./src/pages/**/*.tsx"],
    theme: {
        defaultTheme: {},
        fontFamily: {
            cal: ["Cal Sans", "Inter var", "sans-serif"],
        },
        extend: {
            colors: {
                current: "currentColor",
            },
            fontFamily: {
                sans: ["Inter var", ...defaultTheme.fontFamily.sans],
                mono: ["Consolas", ...defaultTheme.fontFamily.mono],
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
