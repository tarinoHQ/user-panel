require('react-hot-loader/patch');
var path = require('path');
var webpack = require('webpack');
var config = require('./webpack.config.base');
const HtmlWebpackPlugin = require('html-webpack-plugin');

config.debug = true;

config.devtool = 'source-map';

// Independent of Node.JS server:
config.entry = [
  'webpack-dev-server/client?http://localhost:5500',
  'webpack/hot/only-dev-server',
  // 'react-hot-loader/patch',
  config.entry
];

// Usage with Node.JS server
// config.entry = [
//   'react-hot-loader/patch',
//   `webpack-hot-middleware/client?path=/__webpack_hmr`,
//   `webpack/hot/dev-server`,
//   config.entry
// ];

// config.output.filename = "bundle.js";
config.output.publicPath = '/';
// config.output.chunkFilename = "[name]-[chunkhash].js";

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('development')
    }
  }),

  new HtmlWebpackPlugin({
    title: 'tarino development',
    template: './webpack/views/index.webpack.ejs',
  })
]);

config.devServer = {
  colors: true,
  // Enable history API fallback so HTML5 History API based
  // routing works. This is a good default that will come
  // in handy in more complicated setups.
  historyApiFallback: true,

  // Unlike the cli flag, this doesn't set
  // HotModuleReplacementPlugin!
  hot: true,
  inline: true,

  contentBase: path.resolve(__dirname, 'dist'),

  // Display only errors to reduce the amount of output.
  stats: 'errors-only',

  // Parse host and port from env to allow customization.
  //
  // If you use Vagrant or Cloud9, set
  // host: options.host || '0.0.0.0';
  //
  // 0.0.0.0 is available to all network devices
  // unlike default `localhost`.
  host: 'localhost', // Defaults to `localhost`
  port: 5500 // Defaults to 8080
},

config.eslint = {
  configFile: '.eslintrc'
};

module.exports = config;
