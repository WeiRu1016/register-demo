var path = require('path');

var srcDir = path.join(__dirname, '../src');

var config = {
  entry: './src/index.jsx',
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [
      srcDir,
      'node_modules'
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js)|(jsx)$/,
        enforce: 'pre',
        include: srcDir,
        use: {
          loader: 'eslint-loader'
        }
      },
      {
        test: /\.(js|jsx)$/,
        include: srcDir,
        use: [{
          loader: 'babel-loader',
          query: {
            cacheDirectory: false,
          },
        }]
      },
      {
        test: /\.(png|je?pg|svg)$/i,
        use: {
          loader: 'url-loader',
          options: {
            name: 'img/[name].[hash:8].[ext]',
            limit: 1000,
          }
        }
      }
    ]
  },
};
module.exports = config;