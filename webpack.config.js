'use strict'

process.env.BABEL_ENV = 'renderer'

const path = require('path')
const pkg = require('./package.json')
const settings = require('./config.js')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let webpackConfig = {
  // source map 形式 来增强 debug 信息
  devtool: '#eval-source-map',
  devServer: {
    overlay: true,
    contentBase: path.resolve(__dirname, './'),
    port: settings.port,
    hot: true,
    disableHostCheck: true,
    host: '0.0.0.0',
    proxy: {
     '/api/*': {
        target: settings.mainHost,
        changeOrigin: true,
        secure: false
      },
      '/Home/Index': {
        target: settings.mainHost,
        changeOrigin: true,
        secure: false
      },
      '/static/*': {
        target: settings.mainHost,
        changeOrigin: true,
        secure: false
      }
    }
  },
  entry: {
    main: path.join(__dirname, 'app/src/main/index.js'),
    renderer: path.join(__dirname, 'app/src/renderer/main.js')
  },
  externals: Object.keys(pkg.dependencies || {}),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.html$/,
        use: 'vue-html-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        // include: [ path.resolve(__dirname, 'app/src/renderer') ],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.node$/,
        use: 'node-loader'
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            loaders: {
              sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax=1',
              scss: 'vue-style-loader!css-loader!sass-loader'
            }
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'imgs/[name].[ext]'
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'fonts/[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './app/index.ejs',
      appModules: process.env.NODE_ENV !== 'production'
        ? path.resolve(__dirname, './node_modules')
        : false
    })
  ],
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, 'app/dist')
  },
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    alias: {
      'views': path.join(__dirname, 'app/src/renderer/views'),
      '@': path.join(__dirname, 'app/src/renderer'),
      'lib': path.join(__dirname, './node_modules'),
    },
    extensions: ['.js', '.vue', '.json', '.css', '.node'],
    modules: [
      path.join(__dirname, './node_modules'),
      path.join(__dirname, 'node_modules')
    ]
  },
  // 程序run的目标环境
  target: 'electron-renderer'
}
/**
 * Adjust webpackConfig for production settings
 */
if (process.env.NODE_ENV === 'production') {
  webpackConfig.devtool = ''
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  )
}

module.exports = webpackConfig
