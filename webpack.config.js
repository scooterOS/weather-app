const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/weather.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  mode: 'development',
  devServer: {
    watchFiles: ['./src/template.html'],
  },
  plugins: [
    new Dotenv({
      path: './.env',
      systemvars: true,
      silent: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/template.html',
      filename: 'index.html'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src'),
      '@res': path.resolve(__dirname, 'res'),
    },
  },
}