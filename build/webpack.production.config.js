var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var baseConfig = require('./webpack.base.config');

var distDir = path.join(__dirname, '../dist');
var srcDir = path.join(__dirname, '../src');

var appCss = new ExtractTextPlugin({
  filename: 'static/[name].[contenthash].css',
});

module.exports = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: '[name].[chunkhash].js',
    path: distDir,
    // TODO production 修改成cdn地址
    publicPath: '',
    chunkFilename: '[id].[chunkhash:7].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: srcDir,
        use: appCss.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        }),
      },
    ],
  },
  devtool: false,
  plugins: [
    appCss,
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '..'),
      verbose: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../index.html'),
      inject: 'body',
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
  ]
});
