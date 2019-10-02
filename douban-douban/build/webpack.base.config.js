const path = require('path')
const webpack = require('webpack')
const vueConfig = require('./vue-loader.config')
var projectRoot = path.resolve(__dirname, '../')

module.exports = {
  devtool: '#source-map',
  entry: {
    app: './frontend/client-entry.js',
    vendor: ['vue', 'vue-router', 'vuex', 'es6-promise']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'client-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      vue: vueConfig
    })
  ]
}
