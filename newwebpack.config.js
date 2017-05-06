// const { resolve, join } = require('path');
// const webpack = require('webpack');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

// // postccss plugins
// const autoprefixer = require("autoprefixer");
// const easyImport = require("postcss-easy-import");
// const mediaMinMax = require('postcss-media-minmax');
// const customMedia = require("postcss-custom-media");
// const mixins = require('postcss-mixins');
// const calc = require('postcss-calc');
// const cssVariables = require('postcss-css-variables');
// const colorFunction = require('postcss-color-function');
// const conditionals = require('postcss-conditionals');
// const each = require('postcss-each');
// const nested = require('postcss-nested');
// const nestedAncestors = require('postcss-nested-ancestors');
// const colorRgbaFallback = require("postcss-color-rgba-fallback");
// const opacityFallback = require('postcss-opacity');
// const cssnext = require('postcss-cssnext');
// const mqpacker = require('css-mqpacker');


// const port = 2002;
// // dev server port

// module.exports = (env = {}) => {
//   // Environment check
//   const isProduction = env.production === true;

// //   // Postcss loader options 
//   const postCssConfig = {
//     plugins: () => ([
//       mqpacker(),
//       // easyImport({ extensions: ['.sss'] }),
//       mixins,
//       nestedAncestors,
//       nested,
//       // cssnext(),
//       calc,
//       each,
//       colorFunction,
//       colorRgbaFallback(),
//       opacityFallback,
//     ])
//   };

//   // Webpack config
//   let config = {

//     context: resolve(__dirname, './src'),


//     entry: {
//       app: (() => {
//         let app = ['./client/index.js'];

//         if(isProduction) {
//           // production plugins
//         } else {
//           // development plugins
//           app = [ 
//             'react-hot-loader/patch',
//             // activate HMR for React

//             `webpack-dev-server/client?http://localhost:${port}`,
//             // bundle the client for webpack-dev-server
//             // and connect to the provided endpoint

//             'webpack/hot/only-dev-server',
//             // bundle the client for hot reloading
//             // only- means to only hot reload for successful updates

//             ...app
//           ];
//         }

//         return app;
//       })(),
//     },


//     output: {
//       filename: '[name].bundle.js',
//       // the output bundle

//       path: resolve(__dirname, './dist'),

//       publicPath: '/'
//       // necessary for HMR to know where to load the hot update chunks
//     },


//     devtool: (() => {
//       if (isProduction) return 'hidden-source-map';
//       else return 'cheap-module-eval-source-map';
//       // else return 'source-map';
//     })(),


//     module: {
//       rules: (() => {
//         let rules = [
//           {
//             test: /\.js$/,
//             exclude: /(node_modules|bower_components)/,
//             use: ['react-hot-loader/webpack', 'babel-loader'],
//           },
//           {
//             test: /\.css$/,
//             use: [
//               'style-loader', 
//               'css-loader',
//               {
//                 loader: 'postcss-loader',
//                 options: postCssConfig
//               }
//             ]
//           },
//           // {
//           //   test: /\.sss$/,
//           //   use: [
//           //     'style-loader', 
//           //     {
//           //       loader: 'postcss-loader',
//           //       options: Object.assign(postCssConfig, { parser: 'sugarss' })
//           //     },
//           //     'css-loader'
//           //   ]
//           // },
//           {
//             test: /\.(ttf|woff|woff2|eot|otf)$/,
//             use: ['file-loader']
//           },
//           {
//             test: /\.(jpe?g|png|gif|svg)$/,
//             use: [
//               'file-loader', 
//               {
//                 loader: 'image-webpack-loader',
//                 options: {
//                   mozjpeg: {
//                     progressive: true,
//                   },
//                   gifsicle: {
//                     interlaced: false,
//                   },
//                   optipng: {
//                     optimizationLevel: 4,
//                   },
//                   pngquant: {
//                     quality: '75-90',
//                     speed: 3,
//                   },
//                 },
//               }
//             ]
//           },
//           {
//             test: /\.pug$/,
//             use: ['pug-loader']
//           },
//         ];

//         if (isProduction) {
//           rules = [ ...rules ];
//         }

//         return rules;
//       })()
//     },


//     devServer: (() => {
//       if (isProduction) {
//         return {};
//       } else {
//         return {
//           contentBase: resolve(__dirname, 'dist'),
//           // match the output path

//           publicPath: '/',
//           // match the output `publicPath`

//           port: port,
//           hot: true,

//           historyApiFallback: true,
//           compress: true,
//           open: true,
//         };
//       }
//     })(),

//     plugins: (() => {

//       let plugins = [
//         // new webpack.DefinePlugin({
//         //   '__BROWSER__': true
//         // }),

//         new webpack.NoEmitOnErrorsPlugin(),

//         new webpack.LoaderOptionsPlugin({
//           options: {
//             context: __dirname
//           }
//         }),
//       ];

//       if(isProduction) {
//         // production plugins
//         plugins = [
//           ...plugins,

//           new webpack.LoaderOptionsPlugin({
//             minimize: true,
//             debug: false
//           }),

//           new LodashModuleReplacementPlugin(),

//           new webpack.optimize.UglifyJsPlugin({
//             comments: false,
//           })
//         ];
//       } else {
//         // development plugins
//         plugins = [
//           ...plugins,

//           new webpack.HotModuleReplacementPlugin(),
//           // enable HMR globally

//           new webpack.NamedModulesPlugin(),
//           // prints more readable module names in the browser console on HMR updates

//           new webpack.DefinePlugin({
//             'process.env': {
//               'NODE_ENV': JSON.stringify('development')
//             }
//           }),

//           new HtmlWebpackPlugin({
//             filename: 'index.html',
//             template: resolve(__dirname, 'src/common/assets/index.pug')
//           })
//         ];
//       }


//       return plugins;
//     })(),

//   };

  
//   return config;
// };

const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StatsWriterPlugin = require("webpack-stats-plugin").StatsWriterPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');

const autoprefixer = require("autoprefixer");
const easyImport = require("postcss-easy-import");
const mediaMinMax = require('postcss-media-minmax');
const customMedia = require("postcss-custom-media");
const mixins = require('postcss-mixins');
const calc = require('postcss-calc');
const cssVariables = require('postcss-css-variables');
const colorFunction = require('postcss-color-function');
const conditionals = require('postcss-conditionals');
const each = require('postcss-each');
const nested = require('postcss-nested');
const nestedAncestors = require('postcss-nested-ancestors');
const colorRgbaFallback = require("postcss-color-rgba-fallback");
const opacityFallback = require('postcss-opacity');
const cssnext = require('postcss-cssnext');
const mqpacker = require('css-mqpacker');
const smartImport = require("postcss-smart-import")

const port = 2002;
// dev server port

module.exports = (env = {}) => {

  const isProduction = env.production === true;

  const postCssPlugins = () => ([
    mqpacker(),
    smartImport({
      addDependencyTo: webpack
    }),
    // easyImport({ extensions: ['.sss'] }),
    mixins,
    nestedAncestors,
    nested,
    cssnext(),
    calc,
    each,
    colorFunction,
    colorRgbaFallback(),
    opacityFallback,
  ]);

  let config = {

    context: resolve(__dirname, './src'),


    entry: {
      app: (() => {
        let app = [
          'babel-polyfill', 
          // babel polyfill for transform runtime and stuff
          
          './client/index.js'
        ];

        if(isProduction) {
          // production 
        } else {
          // development 
          app = [ 

            'react-hot-loader/patch',
            // activate HMR for React

            `webpack-dev-server/client?http://0.0.0.0:${port}`,
            // bundle the client for webpack-dev-server
            // and connect to the provided endpoint

            'webpack/hot/only-dev-server',
            // bundle the client for hot reloading
            // only- means to only hot reload for successful updates

            ...app
          ];
        }

        return app;
      })(),
    },


    output: {
      filename: '[name].bundle.js',
      // the output bundle

      path: resolve(__dirname, './dist'),

      publicPath: '/'
      // necessary for HMR to know where to load the hot update chunks
    },


    devtool: (() => {
      if (isProduction) return 'hidden-source-map';
      else return 'cheap-module-eval-source-map';
      // else return 'source-map';
    })(),


    module: {
      rules: (() => {
        let rules = [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: ['react-hot-loader/webpack', 'babel-loader']
          },
          {
            test: /\.pug$/,
            use: ['pug-loader']
          },
          
          {
            test: /\.(ttf|woff|woff2|eot|otf)$/,
            use: ['file-loader']
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/,
            use: [
              'file-loader', 
              {
                loader: 'image-webpack-loader',
                options: {
                  mozjpeg: {
                    progressive: true,
                  },
                  gifsicle: {
                    interlaced: false,
                  },
                  optipng: {
                    optimizationLevel: 4,
                  },
                  pngquant: {
                    quality: '75-90',
                    speed: 3,
                  },
                },
              }
            ]
          }
        ];

        // production rules
        if (isProduction) {
          rules = [ 
            ...rules,


            {
              test: /\.css$/,
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                  {
                    loader: 'css-loader',
                    options: {
                      importLoaders: 1,
                      sourceMap: true
                    }
                  },
                  {
                    loader: 'postcss-loader',
                    options: {
                      plugins: postCssPlugins()
                    }
                  },
                ]
              })
            },
            {
              test: /\.sss$/,
              use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                  {
                    loader: 'css-loader',
                    options: {
                      importLoaders: 1,
                      sourceMap: true
                    }
                  },
                  {
                    loader: 'postcss-loader',
                    options: {
                      parser: 'sugarss',
                      plugins: postCssPlugins()
                    }
                  },
                ]
              })
            }
          ];


        } else {
          // development rules
          rules = [  
            ...rules,

            
            // use css without extracting in file
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader']
            },
            {
              test: /\.sss$/,
              use: [
                'style-loader', 
                'css-loader',
                {
                  loader: 'postcss-loader',
                  options: {
                    parser: 'sugarss',
                    plugins: postCssPlugins(),
                  }
                },
              ]
            },
          ];
        }

        return rules;
      })()
    },


    devServer: (() => {
      if (isProduction) {
        return {};
      } else {
        return {
          contentBase: resolve(__dirname, 'dist'),
          // match the output path

          publicPath: '/',
          // match the output `publicPath`

          port: port,
          hot: true,

          historyApiFallback: true,
          compress: true,
          open: true,
        };
      }
    })(),


    plugins: (() => {

      let plugins = [
        new DuplicatePackageCheckerPlugin(),

        new webpack.LoaderOptionsPlugin({
          options: {
            context: __dirname
          }
        }),

        new webpack.optimize.CommonsChunkPlugin({
          name: ['polyfills', 'vendor'].reverse()
        }),

      ];

      if(isProduction) {
        // production plugins
        plugins = [
          ...plugins,

          new ExtractTextPlugin('style.css'),

          new webpack.DefinePlugin({
            '__BROWSER__': true,
            'process.env.NODE_ENV': JSON.stringify('production')
          }),

          new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
          }),

          new LodashModuleReplacementPlugin(),

          new webpack.optimize.AggressiveMergingPlugin(),

          // ignore dev config
          new webpack.IgnorePlugin(/\.\/dev/, /\/config$/, /react/),


          new webpack.optimize.UglifyJsPlugin({
            comments: false
          }),

          // Write out stats.json file to build directory.
          new StatsWriterPlugin({
            filename: "stats.json", // Default
            chunkModules: true,
            transform: function (data) {
              console.log(data);
              return JSON.stringify({
                main: data.assetsByChunkName.app[0],
                polyfills: data.assetsByChunkName.polyfills,
                css: data.assetsByChunkName.app[1]
              }, null, 2);
            }
          }),

          // Clean up
          new CleanWebpackPlugin(['dist'], {
            root: '/Users/mohammad/Documents/htdocs/tarino/user-panel/',
            verbose: true, 
            dry: false,
            // exclude: ['shared.js']
          })
        ];
      } else {
        // development plugins
        plugins = [
          ...plugins,

          new webpack.DefinePlugin({
            '__BROWSER__': true,
          }),

          new webpack.HotModuleReplacementPlugin(),
          // enable HMR globally

          new webpack.NamedModulesPlugin(),
          // prints more readable module names in the browser console on HMR updates

          new HtmlWebpackPlugin({
            filename: 'index.html',
            chunksSortMode: 'dependency',
            template: './common/assets/index.pug',
            // template: resolve(__dirname, './common/assets/index.pug'),
          })
        ];
      }


      return plugins;
    })(),

  };

  
  return config;
}
