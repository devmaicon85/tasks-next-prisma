function withOpacityValue(variable) {
    return ({ opacityValue }) => {
        if (opacityValue === undefined) {
            return `var(${variable})`; // return `rgb(var(${variable}))`;
        }
        return `var(${variable})`; // return `rgb(var(${variable}) / ${opacityValue})`;
    };
}

module.exports = {
    mode: "jit", // criar o css necessario somente que o app precisa
    content: ["./src/components/**/*.tsx", "./src/pages/**/*.tsx"],
    darkMode: "class",

    // variants: {
    //     typography: ['dark'],
    //   },

    theme: {
        // defaultTheme: {},

        extend: {
            colors: {
                primary: withOpacityValue("--color-primary"),
                danger: withOpacityValue("--color-danger"),
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
