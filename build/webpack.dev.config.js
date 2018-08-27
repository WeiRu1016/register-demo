var path = require('path');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var baseConfig = require('./webpack.base.config');

var distDir = path.join(__dirname, '../dist');
var srcDir = path.join(__dirname, '../src');

module.exports = merge(baseConfig, {
  output: {
    filename: '[name].js',
    path: distDir,
    publicPath: '',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [srcDir, /node_modules/],
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  devServer: {
    port: 9999,
    disableHostCheck: true,
    inline: true, // 实时刷新
    hot: true, // 使用热加载插件 HotModuleReplacementPlugin
    overlay: true,
  },
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    //将打包文件插入到模板index页面中
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../index.html'),
      inject: 'body',
    }),
  ],
});
