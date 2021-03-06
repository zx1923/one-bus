const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");

module.exports = {
  entry: './demo/index.web.js',
  output: {
    filename: 'chunk.js',
    path: path.resolve(__dirname, 'dist/demo'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlPlugin({
      title: "one bus demo",
      filename: "index.html"
    })
  ],
};