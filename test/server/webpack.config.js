var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool:"eval",
  entry: {
    app:[

      path.join(__dirname, '/app')
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/static'
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname + '/../../node_modules/react')
    },
    extensions:[".js", ".ts", ".tsx","", ".webpack.js", ".web.js"],
    fallback: path.join(__dirname, "node_modules")
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: ['ts'],
        exclude: /(node_modules)/
      },
      {
        test: /\.(scss|css)$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.(jpg|png|svg)$/,
        loaders: [
            'file-loader?name=[name].[ext]'
        ]
      }
    ]
  }
};
