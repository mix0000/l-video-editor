const FileManagerPlugin = require("filemanager-webpack-plugin");
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
      logging: "error",
    },
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
  plugins: [
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            {
              source: path.resolve(__dirname, "public/**/*.png"),
              destination: path.resolve(__dirname, "dist"),
            },
          ],
        },
      },
    }),
  ],
});

module.exports = devBuild;
