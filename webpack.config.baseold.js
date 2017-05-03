var path = require('path');
var webpack = require('webpack');
var autoprefixer = require("autoprefixer");
var easyImport = require("postcss-easy-import");
var mediaMinMax = require('postcss-media-minmax');
var customMedia = require("postcss-custom-media");
var mixins = require('postcss-mixins');
var calc = require('postcss-calc');
var cssVariables = require('postcss-css-variables');
var colorFunction = require('postcss-color-function');
var conditionals = require('postcss-conditionals');
var each = require('postcss-each');
var nested = require('postcss-nested');
var nestedAncestors = require('postcss-nested-ancestors');
var colorRgbaFallback = require("postcss-color-rgba-fallback");
var opacityFallback = require('postcss-opacity');

// Webpack loaders list
var loaders = [
  {
    test: /\.js$/,
    loaders: ['babel'],
    include: path.join(__dirname, '/src')
  },
  {
    test: /\.sss$/,
    loader: 'style!css!postcss?parser=sugarss'
  },
  {
    test: /\.css$/,
    loader: 'style!css!postcss',
  },
  {
    test: /\.json$/,
    loader: 'json'
  },
  {
    test: /\.(ttf|woff(2)?|eot|svg|png|jpg|jpeg)$/,
    loader: 'url?limit=10000'
  }
];

// Webpack plugins
var plugins = [
  new webpack.DefinePlugin({
    '__BROWSER__': true
  }),
  // new styleLint({
    // configFile: '.stylelintrc',
    // files: '**/*.s?(a|c)ss',
    // syntax: 'sugarss'
  // })
  // new CopyWebpackPlugin([
  //     { from: 'src/images', to: 'images/' }
  // ]),
];

// PostCSS init
var postcss = function (webpack) {
  return [
    easyImport({ extensions: ['.sss'] }),
    mediaMinMax(),
    customMedia(),
    autoprefixer({ browsers: ['> 2% in IR', 'ie >= 8'] }),
    mixins,
    conditionals,
    cssVariables,
    calc,
    colorFunction,
    each,
    nestedAncestors,
    nested,
    colorRgbaFallback(),
    opacityFallback,
  ];
};

// Resolve
var resolve = {
  extensions: ['', '.sss', '.css', '.js']
};

// Main config object
var config = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: loaders
  },
  plugins: plugins,
  postcss: postcss,
  resolve: resolve
};

module.exports = config;
