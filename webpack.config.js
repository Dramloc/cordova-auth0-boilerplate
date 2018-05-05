const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'www'),
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.jsx?$/, use: ['babel-loader'] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: { collapseWhitespace: true },
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.AUTH0_DOMAIN': JSON.stringify('dramloc.eu.auth0.com'),
      'process.env.AUTH0_CLIENT_ID': JSON.stringify('b1zOabwFOSOG6f8wHQ3Jvu9SkoEf6sGe'),
      'process.env.AUTH0_AUDIENCE': JSON.stringify('https://cordova-test.com'),
      'process.env.PACKAGE_ID': JSON.stringify('com.dramloc.cordova.test'),
      'process.env.CALLBACK_URL': JSON.stringify('http://localhost:8080/callback'),
    }),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
