module.exports = {
  map: false,
  plugins: {
    'postcss-import': {},
    precss: {
      'postcss-preset-env': {
        stage: 1,
        preserve: true
      }
    },
    autoprefixer: {},
    cssnano: {}
  }
};
