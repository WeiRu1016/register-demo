module.exports = {
  parser: require('postcss-safe-parser'),
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-css-variables'),
    require('autoprefixer')({browsers:'chrome >= 42, safari >= 8, IE >= 8'})
  ],
};
