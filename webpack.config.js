'use strict';

const path = require('path');

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: './libs/index.js',
  module: {
    rules: [
      { test: /libs\/index\.js$/, use: [{loader: 'babel-loader'}], exclude: /node_modules/ }
    ]
  },
  output: {
    library: 'Libs',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist/libs'),
    filename: 'index.js'
  }
};

module.exports = config;