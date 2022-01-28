const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const { merge } = require("webpack-merge");
const path = require("path");

const common = require("./webpack.common");

const mediaInfoWasm = "MediaInfoModule.wasm";
const mediaInfoWasmFile = path.resolve(
  __dirname,
  "node_modules",
  "mediainfo.js",
  "dist",
  mediaInfoWasm,
);

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
    new CleanWebpackPlugin(),
    new FileManagerPlugin({
      events: {
        onEnd: {
          copy: [
            {
              source: path.resolve(__dirname, "public/**/*.png"),
              destination: path.resolve(__dirname, "dist"),
            },
            {
              source: mediaInfoWasmFile,
              destination: path.resolve(__dirname, "dist", mediaInfoWasm),
            },
          ],
        },
      },
    }),
  ],
});

module.exports = devBuild;
