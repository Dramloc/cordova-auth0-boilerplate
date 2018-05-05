const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'cheap-module-eval-source-map',
  mode: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'www'),
  },
  module: {
    rules: [
      { test: /\.jsx?$/, enforce: 'pre', use: ['source-map-loader'] },
      { test: /\.jsx?$/, use: ['babel-loader'] },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: process.env.NODE_ENV === 'production',
                importLoaders: 1,
                minimize: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: process.env.NODE_ENV === 'production',
                plugins: () => {
                  autoprefixer({ browsers: ['last 2 versions'] });
                },
              },
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
      disable: process.env.NODE_ENV !== 'production',
    }),
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
