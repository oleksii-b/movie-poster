const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');

const bundleFileName = 'bundle.js';
const moduleSrc = /components|routes/;
const getStylesLoadersConfig = (options) => {
  if (options === void(0)) {
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
      modules: [
        'node_modules',
        'src'
      ],
      extensions: [
        '.js',
        '.css',
        '.less'
      ]
    },

    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: [
              'env',
              'flow',
              'react',
              'stage-0'
            ]
          }
        }, {
          test: /\.(png|woff|woff2|eot|ttf|svg)$/,
          exclude: /(?:node_modules?!\/bootstrap)|theme/,
          loader: (env === 'build') ? 'url-loader?limit=1024&name=fonts/[name].[ext]' : 'file-loader'
        }, {
          test: /\.(jpg|svg)$/,
          exclude: /node_modules/,
          loader: (env === 'build') ? 'url-loader?limit=10000&name=img/[name].[ext]' : 'file-loader'
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
                exclude: /node_modules?!\/bootstrap/,
                use: [
                  'style-loader',
                  'css-loader',
                  'autoprefixer-loader'
                ]
              }, {
                test: /\.less$/,
                include: moduleSrc,
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
                exclude: [
                  moduleSrc,
                  /node_modules/
                ],
                use: [
                  {
                    loader: 'style-loader'
                  },
                  ...getStylesLoadersConfig()
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
                include: moduleSrc,
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
                exclude: [
                  moduleSrc,
                  /node_modules/
                ],
                use: ExtractTextPlugin.extract({
                  publicPath: '../',
                  fallback: 'style-loader',
                  use: [
                    ...getStylesLoadersConfig()
                  ]
                })
              }, {
                // test: /\.(jpg|svg)$/,
                // use: [
                //   'url-loader?limit=1024&name=img/[name].[ext]',
                //   'img-loader'
                // ]
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
