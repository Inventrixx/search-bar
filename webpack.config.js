// webpack.config.js
const path = require("path");

var webpack = require("webpack");
var package = require("./package.json");

const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: ["./src/index.js", "./src/auto-complete.js", "./src/index.css"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: `${package.name}-${package.version}.bundle.js`
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: "script-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    }),
    new UglifyJSPlugin({
      sourceMap: true
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: "LS Search Bar",
      inject: "body",
      template: "src/index.html"
    })
  ],
  devtool: "source-map",
  devServer: {
    writeToDisk: true,
    compress: true,
    port: 3002,
    hot: true
  }
};
