const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const InlineChunkHtmlPlugin = require("react-dev-utils/InlineChunkHtmlPlugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const webpack = require("webpack");
const pkg = require("./package.json");
const fs = require("fs");
var coreCSS = "/*not generated yet*/";

const env = process.env.NODE_ENV;

const econfig = {
  mode: env || "development",
};

module.exports = function(env, argv) {
  let builddir = argv.mode == "production" ? "dist" : "test";

  return {
    //externals: ["fs"],
    watch: argv.mode != "production",
    target: "web",

    mode: argv.mode,
    entry: {
      main: "./src/index.js",
    },

    devtool: argv.mode != "production" ? "inline-source-map" : false,
    devServer: {
      historyApiFallback: true,
      client: {
        overlay: false,
      },
      static: {
        directory: path.join(__dirname, "test"),
      },
    },

    output: {
      //   filename: '[name].js',
      path: path.resolve(__dirname, builddir, ""),
    },

    module: {
      rules: [
        {
          resourceQuery: /raw/,
          type: "asset/source",
        },

        {
          test: /\.svg$/,
          resourceQuery: /raw/,
          type: "asset/source",
        },
        {
          test: /[\/]?static/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: `[name].[ext]`,
              },
            },
          ],
        },
        {
          test: /\.svg$/,
          resourceQuery: { not: [/raw/] },
          type: "asset/inline",
        },

        {
          test: /\.(less|css|scss)$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.png$/,
          use: [
            { loader: "file-loader", options: { name: "pix/[name].[ext]" } },
          ],
        },
        {
          test: /\.(woff|ttf)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "fonts/[name].[ext]",
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        // Definitions...
        VERSION: JSON.stringify(pkg.version),
      }),
      // new MiniCssExtractPlugin({
      //   filename: "[name].css",
      //   chunkFilename: "[id].css"
      // }),
      new HtmlWebpackPlugin({
        chunks: ["main"],
        filename: "index.html",
        minify: false,
        inject: "body",
        template: path.join(__dirname, "src/templates/index.ejs"),
      }),
      // new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/loader/]),
      // new HTMLInlineCSSWebpackPlugin(

      //   {
      //     filter: (n)=>{console.log("NAME" , n) ; return n!=="editor.css"},
      //     leaveCSSFile: true,
      //     replace:
      //     {target: '<style id="customCSS">' ,
      //       position: "before",
      //       removeTarget: false,
      //     },
      //     styleTagFactory({ style }){ return `<style id="coreCSS">${ style }</style>`
      //     },
      //   }
      // ),
    ],
  };
};
