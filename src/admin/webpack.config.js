'use strict';

const path = require('path');
const BASE_DIR = path.resolve('./src/admin');

const webpack = require('webpack');

module.exports = {
  entry: path.resolve(BASE_DIR, './app/main.ts'),
  output: {
    path: BASE_DIR,
    filename: 'admin.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.css$/, use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: {modules: true}},
        ],
      },
      { test: /\.ts$/, use: [{loader: 'awesome-typescript-loader'}] },
      { test: /\.html$/, use: [{loader: 'html-loader'}] },
      { test: /\.(png|jpg)$/, use: [{loader: 'file-loader'}] },
    ],
  },
  resolve: {
    extensions: ['.js', '.json', '.ts'],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      Chartist: path.resolve(BASE_DIR, './assets/js/chartist.min.js'),
    }),
  ],
  devServer: {
    contentBase: BASE_DIR,
    port: 9000,
  },
};
