require('react-hot-loader/patch');
var webpack = require('webpack');
var config = require('./webpack.config.base.js');

config.debug = true;

config.devtool = 'eval-source-map';

// Independent of Node.JS server:
// config.entry = [
//   'webpack-dev-server/client?http://localhost:8080',
//   'webpack/hot/only-dev-server',
//   'react-hot-loader/patch',
//   config.entry
// ];

// Usage with Node.JS server
config.entry = [
  'react-hot-loader/patch',
  `webpack-hot-middleware/client?path=/__webpack_hmr`,
  `webpack/hot/dev-server`,
  config.entry
];

config.plugins = config.plugins.concat([
  new webpack.HotModuleReplacementPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('development')
    }
  })
]);

config.devServer = {
  colors: true,
  hot: true,
  inline: true
};

config.eslint = {
  configFile: '.eslintrc'
};

module.exports = config;
