module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['src/**.*.tsx', 'src/**.*.ts'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
    colors: {
      primary: '#00ABE7',
      light: '#FFFFFF',
    },
  },
  variants: {},
  plugins: [],
};
