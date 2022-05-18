module.exports = {
  mode: 'jit', // criar o css necessario somente que o app precisa
  content: [
    './src/components/**/*.tsx',
    './src/pages/**/*.tsx'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
