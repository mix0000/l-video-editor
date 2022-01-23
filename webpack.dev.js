const FileManagerPlugin = require("filemanager-webpack-plugin");
const { merge } = require("webpack-merge");
const path = require("path");

const common = require("./webpack.common");

const wasmFileName = "MediaInfoModule.wasm";

const wasmFile = path.resolve(__dirname, "node_modules", "mediainfo.js", "dist", wasmFileName);

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
            {
              source: wasmFile,
              destination: path.resolve(__dirname, "dist", wasmFileName),
            },
          ],
        },
      },
    }),
  ],
});

module.exports = devBuild;
