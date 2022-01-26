const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

const path = require("path");
const isDev = process.env.NODE_ENV === "development";
const BUILD_FOLDER = path.resolve(__dirname, "dist");

console.log(path.resolve(__dirname, "dist"));

module.exports = {
  entry: {
    "l-video-editor": "./src/main.tsx",
  },
  stats: {
    all: false,
    modules: true,
    errors: true,
    warnings: true,
    moduleTrace: true,
    errorDetails: true,
    colors: true,
  },
  optimization: {
    runtimeChunk: true,
    chunkIds: "named",
    splitChunks: {
      chunks: "all",
    },
  },
  output: {
    path: BUILD_FOLDER,
    filename: "[name].js",
    chunkFilename: "[name].[id].js",
    umdNamedDefine: true,
  },
  plugins: [
    new NodePolyfillPlugin(),
    new HtmlWebpackPlugin({
      title: "L Video Editor",
      filename: "index.html",
      template: "public/index.html",
      inject: false,
      minify: false,
      alwaysWriteToDisk: true,
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: path.resolve(__dirname, "dist"),
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        mode: "write-references",
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        configOverwrite: {
          compilerOptions: {
            sourceMap: isDev,
          },
        },
      },
      issue: {
        exclude: {
          file: "node_modules/**/*",
        },
      },
    }),
  ],
  resolve: {
    alias: {
      AppDir: path.resolve(__dirname, "src/app"),
    },
    extensions: ["*", ".ts", ".tsx", ".js", ".jsx"],
    fallback: {
      fs: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: ["thread-loader", "babel-loader?cacheDirectory=true"],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "images/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, "postcss.config.js"),
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
};
