const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FileManagerPlugin = require("filemanager-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { merge } = require("webpack-merge");
const path = require("path");
const common = require("./webpack.common");

const wasmFileName = "MediaInfoModule.wasm";

const wasmFile = path.resolve(__dirname, "node_modules", "mediainfo.js", "dist", wasmFileName);

const prodBuild = merge(common, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
      }),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
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

module.exports = prodBuild;
