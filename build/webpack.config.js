var path = require('path');
var isProduction = process.env.NODE_ENV === 'production';

var distDir = path.join(__dirname, './dist');
var srcDir = path.join(__dirname, './src');

var getCssLoader = function (isProduct) {
  if (isProduct) {
    return appCss.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'postcss-loader'],
    });
  }
  return ['style-loader', 'css-loader', 'postcss-loader'];
}

var appCss = new ExtractTextPlugin({
  filename: isProduct ? 'static/[name].[contenthash].css' : 'static/[name].css'
});

var config = {
  entry: './src/index.jsx',
  output: {
    filename: isProduct ? '[name].[chunkhash].js' : '[name].js',
    path: distDir,
    // TODO production 修改成cdn地址
    publicPath: isProduction ? '' : '',
  },
  mode: isProduction ? 'production' : 'development',
  devServer: {
    port: 9999,
    disableHostCheck: true,
    inline: true, // 实时刷新
    hot: true, // 使用热加载插件 HotModuleReplacementPlugin
    overlay: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
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
        test: /\.(js|jsx)/,
        include: srcDir,
        use: [{
          loader: 'babel-loader',
          query: {
            cacheDirectory: false,
          },
        }]
      },
      {
        test: /\.css$/,
        include: srcDir,
        use: getCssLoader()
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
  plugins: [
    new webpack.HashedModuleIdsPlugin(),
  ],
};
module.exports = config;