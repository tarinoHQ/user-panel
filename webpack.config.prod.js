var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
var extractCSS = new ExtractTextPlugin('styles/[name]-[chunkhash].css');
var CleanWebpackPlugin = require('clean-webpack-plugin');
// Import common webpack config
var config = require('./webpack.config.base.js');

// dis url
var dist = path.resolve(__dirname, "/dist");

// Devtool
config.devtool = 'cheap-module-source-map';

// Extract css to a seprate file
config.module.loaders[1] = {
  test: /\.sss$/,
  loader: extractCSS.extract('style', 'css?sourceMap!postcss?parser=sugarss')
};
config.module.loaders[2] = {
  test: /\.css$/,
  loader: extractCSS.extract('style', 'css?sourceMap!postcss')
};

config.output.filename = "[name]-[hash].js";
config.output.chunkFilename = "[name]-[chunkhash].js";
config.output.publicPath = '/dist/';

// --
// config.externals = {
//   "react": "React",
// },

// Optimize for production
config.plugins = config.plugins.concat([
  extractCSS,

  // new webpack.optimize.CommonsChunkPlugin('common.js'),
  new webpack.DefinePlugin({
    '__BROWSER__': true,
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),

  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.AggressiveMergingPlugin(),

  // ignore dev config
  new webpack.IgnorePlugin(/\.\/dev/, /\/config$/, /react/),

  // new webpack.ProvidePlugin({
  //   React: "React", react: "React", "window.react": "React", "window.React": "React"
  // })

  // Write out stats.json file to build directory.
  new StatsWriterPlugin({
    filename: "stats.json", // Default
    transform: function (data) {
      return JSON.stringify({
        main: data.assetsByChunkName.main[0],
        css: data.assetsByChunkName.main[1]
      }, null, 2);
    }
  }),

  // Clean up
  new CleanWebpackPlugin(['dist'], {
    root: '/Users/mohammad/Documents/htdocs/tarino/panel/',
    verbose: true, 
    dry: false,
    // exclude: ['shared.js']
  })
]);

module.exports = config;
