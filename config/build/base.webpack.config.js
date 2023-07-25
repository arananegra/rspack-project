const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const helpers = require("./helpers");

module.exports = {
  context: helpers.resolveFromRootPath("src"),
  target: "web",
  entry: {
    app: ["../index.tsx"],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".scss"],
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: "swc-loader",
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        type: "asset/resource",
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.(png|jpg|jpeg|ico|gif)?$/,
        type: "asset/resource",
      },
      {
        test: /\.html$/,
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html", //Name of file in ./dist/
      template: "index.html", //Name of template in ./src
      hash: true,
      scriptLoading: "defer",
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: new RegExp("/^\\.\\/locale$/, /moment$/"),
    })
  ],
};
