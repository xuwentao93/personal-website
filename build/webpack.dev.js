const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');
const webpackBase = require('./webpack.base');

const webpackConfig = merge(webpackBase, {
  entry: path.join(__dirname, '../app/main.js'), // 已多次提及的唯一入口文件
  output: {
    path: path.join(__dirname, '../dist'), // 打包后的文件存放的地方
    filename: '[name]_[hash].js',
    publicPath: '/'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: '../dist',
    port: 2222,
    hot: true,
    stats: 'errors-only',
    historyApiFallback: true // 解决 bowserRouter 刷新的时候出现 can't get.
  },
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserWebpackPlugin({ url: 'http://localhost:2222' })
  ]
});

module.exports = webpackConfig;
