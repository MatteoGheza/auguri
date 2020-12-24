const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

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
    optimization: {
        mergeDuplicateChunks: true,
        minimize: true,
        minimizer: [new UglifyJsPlugin({
          parallel: true,
          extractComments: true
        })]
    }
});