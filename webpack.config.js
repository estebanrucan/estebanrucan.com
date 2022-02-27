const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const ruleForJavascript = {
  test: /\.js$/,
  loader: "babel-loader",
  exclude: "/node_modules/",
  options: {
    presets: [
      ["@babel/preset-react", { runtime: "automatic" }],
      "@babel/preset-env",
    ],
  },
};

const ruleForStyles = {
  test: /\.css$/,
  use: ["style-loader", "css-loader"],
};

const ruleForImages = (isProduction) => ({
  test: /\.(gif|png|jpe?g|svg)$/i,
  use: [
    "file-loader",
    {
      loader: "image-webpack-loader",
      options: {
        disable: !isProduction, // webpack@2.x and newer
        webp: {
          quality: 90,
        },
      },
    },
  ],
});

const ruleForFiles = {
  test: /\.pdf$/,
  loader: "file-loader",
  options: {
    name: "[name].[ext]",
  },
};

module.exports = (env, args) => {
  const { mode } = args;
  const isProduction = mode === "production";

  return {
    mode: isProduction ? "production" : "development",
    output: {
      filename: isProduction ? "[name].[contenthash].js" : "main.js",
      path: path.resolve(__dirname, "build"),
      clean: true,
    },
    module: {
      rules: [
        ruleForJavascript,
        ruleForStyles,
        ruleForFiles,
        ruleForImages(isProduction),
      ],
    },
    plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
    devServer: {
      open: true,
      port: 3000,
      compress: true,
      client: {
        overlay: true,
      },
    },
    devtool: "source-map",
  };
};
