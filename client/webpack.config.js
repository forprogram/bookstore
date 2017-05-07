var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: {
    index: './src/index/index.js',
    admin: './src/admin/index.js',
  },
  output: {
    path: path.resolve(__dirname, './assets'),
    filename: 'js/[name].build.js'
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html',
      // favicon: 'favicon.ico',
      chunks:['index'],
      minify: {
        removeComments: true,
        collapseWhitespace: false
      }
    }),
    new HtmlWebpackPlugin({
      template: './admin.html',
      filename: 'admin.html',
      chunks:['admin'],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
          options: {
            loaders: {
              'scss': ExtractTextPlugin.extract({
                use: 'css-loader!sass-loader',
                fallback: 'vue-style-loader', // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
              })
            }
          }  
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|jpge)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        //loader: 'style-loader!css-loader'
        use: ExtractTextPlugin.extract({
          use: "css-loader",
          fallback: "style-loader"
        })
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
