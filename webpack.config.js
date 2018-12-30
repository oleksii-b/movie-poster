const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');


const bundleFileName = 'bundle.js';

module.exports = (env) => {
  const common = {
    entry: [
      'babel-polyfill',
      'index.js'
    ],

    output: {
      path: path.join(__dirname, '/build'),
      publicPath: '/',
      filename: (env === 'build') ? `js/${bundleFileName}` : bundleFileName
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'public/index.html'
      })
    ],

    resolve: {
      modules: ['node_modules', 'src'],
      extensions: ['.js', '.css', '.less']
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: [/node_modules/],
          options: {
            presets: [
              'env',
              'flow',
              'react',
              'stage-0'
            ]
          }
        }
      ]
    }
  };

  switch (env) {
    case 'dev':
      return merge([
        common,
        {
          devServer: {
            historyApiFallback: true,
            port: 8811
          },

          devtool: 'inline-source-map',

          module: {
            rules: [
              {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader',
                  'autoprefixer-loader'
                ]
              }, {
                test: /\.less$/,
                exclude: [/(components|pages)/],
                use: [{
                  loader: 'style-loader'
                }, {
                  loader: 'css-loader',
                  options: {
                    sourceMap: true
                  }
                // }, {
                //   loader: 'resolve-url-loader',
                //   options: {
                //     absolute: true,
                //     root: './'
                //   }
                }, {
                  loader: 'autoprefixer-loader'
                }, {
                  loader: 'less-loader',
                  options: {
                    sourceMap: true
                  }
                }]
              }, {
                test: /\.less$/,
                include: [/(components|pages)/],
                use: [{
                  loader: 'style-loader'
                }, {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    localIdentName: '[name]-[local]',
                    sourceMap: true
                  }
                }, {
                  loader: 'autoprefixer-loader'
                }, {
                  loader: 'less-loader',
                  options: {
                    sourceMap: true
                  }
                }]                
              }, {
                test: /\.(jpg|svg)$/,
                use: [
                  'url-loader'
                ]
              }, {
                // test: /\.jpg$/,
                // issuer: {
                //     test: /\.less$/,
                // },
                // loader: 'img-loader'
              }
            ]
          }
        }
      ]);
    case 'build':
      return merge([
        common,
        {
          module: {
            rules: [
              {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  publicPath: '../',
                  fallback: 'style-loader',
                  use: [
                    'css-loader',
                    'autoprefixer-loader'
                  ]
                }),
                exclude: [/node_modules?!(\/bootstrap)/]
              }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                  publicPath: '../',
                  fallback: 'style-loader',
                  use: [
                    'css-loader',
                    'autoprefixer-loader',
                    'less-loader'
                  ]
                }),
                exclude: [/node_modules/]
              }, {
                test: /\.(jpg|svg)$/,
                use: [
                  'url-loader?limit=1024&name=/img/[name].[ext]',
                  'img-loader'
                ]
              }
            ]
          },

          plugins: [
            new ExtractTextPlugin('./css/[name].css')
          ]
        }
      ]);
  }
};
