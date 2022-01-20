const { merge } = require("webpack-merge");

const path = require("path");

const common = require("./webpack.common");

const devBuild = merge(common, {
  mode: "development",
  devServer: {
    historyApiFallback: true,
    open: true,
    hot: true,
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
    client: {
      progress: true,
      logging: "info",
    },
  },
});

module.exports = devBuild;
