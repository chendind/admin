var webpack = require('webpack')
var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var copyWebpackPlugin = require('copy-webpack-plugin');

var vuxLoader = require('vux-loader')

var env = process.env.NODE_ENV
// check env & config/index.js to decide whether to enable CSS source maps for the
// various preprocessor loaders added to vue-loader at the end of this file
var isDev = env === 'development'
var isProd = env === 'production'
var cssSourceMapDev = (isDev && config.dev.cssSourceMap)
var cssSourceMapProd = (isProd && config.build.productionSourceMap)

var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

module.exports = function makeWebpackConfig() {
  var __config = {}

  __config.entry = {
    app: './src/main.js'
  }
  __config.output = {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js'
  }
  __config.resolve = {
    extensions: ['', '.js', '.vue', '.json'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'components': path.resolve(__dirname, '../src/components'),
      'pages': path.resolve(__dirname, '../src/pages'),
      'static': path.resolve(__dirname, '../static'),
      'root': path.resolve(__dirname, '../')
    }
  }
  __config.resolveLoader= {
    fallback: [path.join(__dirname, '../node_modules')]
  }
  __config.module= {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
  __config.plugins= [
      // new copyWebpackPlugin([
      //     { from: './node_modules/tinymce/plugins', to: './plugins' },
      //     { from: './node_modules/tinymce/themes', to: './themes' },
      //     { from: './node_modules/tinymce/skins', to: './skins' },
      //     { from: './node_modules/tinymce/langs', to: './langs' }
      // ])
      new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery"
      })
  ]
  __config.vue= {
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        browsers: ['last 2 versions']
      })
    ]
  }
  if (isDev) {
    // __config.devtool = 'inline-source-map';
  }
  return __config
}();

