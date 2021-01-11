const { resolve } = require("path");

module.exports = {
  entry: "./dist/graphre.js",
  mode: "none",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "graphre.es5.js",
  },
  module: {
    rules: [{ test: /\.js$/, use: "babel-loader", exclude: /node_modules/ }],
  },
};
