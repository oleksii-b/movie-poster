const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');

const bundleFileName = 'bundle.js',
  getStylesLoadersConfig = (options) => {
    if (typeof options === 'undefined') {
      options = {
        modules: false
      };
    }

    return [
      {
        loader: 'css-loader',
        options: {
          modules: options.modules ? true : false,
          localIdentName: '[name]-[local]',
          sourceMap: true
        }
      }, {
        loader: 'autoprefixer-loader'
      }, {
        loader: 'less-loader',
        options: {
          paths: [
            path.resolve(__dirname, 'src/theme')
          ],
          sourceMap: true
        }
      }
    ];
  };


module.exports = (env) => {
  const common = {
    entry: [
      'babel-polyfill',
      'index.js'
    ],

    output: {
      path: path.join(__dirname, '/build'),
      publicPath: (env === 'build') ? '' : '/',
      filename: (env === 'build') ? `js/${bundleFileName}` : bundleFileName
    },

    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'public/index.html'
      })
    ],

    resolve: {
      alias: {
        atoms: path.resolve(__dirname, 'src/theme/')
      },
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
                include: [/(components|pages)/],
                use: [
                  {
                    loader: 'style-loader'
                  },
                  ...getStylesLoadersConfig({
                    modules: true
                  })
                ]
              }, {
                test: /\.less$/,
                exclude: [/(components|pages)/],
                use: [
                  {
                    loader: 'style-loader'
                  },
                  ...getStylesLoadersConfig()
                ]
              }, {
                test: /\.(jpg|svg)$/,
                use: [
                  'url-loader'
                ]
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
                })
              }, {
                test: /\.less$/,
                include: [/(components|pages)/],
                use: ExtractTextPlugin.extract({
                  publicPath: '../',
                  fallback: 'style-loader',
                  use: [
                    ...getStylesLoadersConfig({
                      modules: true
                    })
                  ]
                })
              }, {
                test: /\.less$/,
                exclude: [/(node_modules|components|pages)/],
                use: ExtractTextPlugin.extract({
                  publicPath: '../',
                  fallback: 'style-loader',
                  use: [
                    ...getStylesLoadersConfig()
                  ]
                })
              }, {
                test: /\.(jpg|svg)$/,
                use: [
                  'url-loader?limit=1024&name=img/[name].[ext]',
                  'img-loader'
                ]
              }
            ]
          },

          plugins: [
            new ExtractTextPlugin('css/[name].css')
          ]
        }
      ]);
  }
};
