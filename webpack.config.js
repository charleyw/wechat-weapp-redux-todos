'use strict';

const path = require('path');
const webpack = require('webpack');

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: './libs/index.js',
  module: {
    rules: [
      { test: /libs\/index\.js$/, use: [{loader: 'babel-loader'}], exclude: /node_modules/ }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    })
  ],
  output: {
    library: 'Libs',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist/libs'),
    filename: 'index.js'
  },
  node: {
    setImmediate: false
  }
};

module.exports = config;