const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    module: {
        rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                    plugins: ['@babel/plugin-transform-runtime']
                }
              }
            }
        ]
    },
    plugins: [
      new FaviconsWebpackPlugin({
        inject: true,
        cache: true,
        publicPath: 'images',
        outputPath: 'images',
        prefix: 'images/',
        favicons: {
          appName: 'auguri',
          appDescription: 'Auguri da Matteo',
          developerName: 'Matteo Gheza',
          developerURL: "https://github.com/Matteogheza/auguri",
          background: '#202020',
          theme_color: '#202020',
          icons: {
            coast: false,
            yandex: false,
            appleStartup: false,
            firefox: false,
            windows: false               
          }
        }
      })
    ],
    optimization: {
        mergeDuplicateChunks: true,
        minimize: true,
        /*minimizer: [new UglifyJsPlugin({
          parallel: true,
          extractComments: true
        })]*/
    }
});