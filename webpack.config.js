const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src/main.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      // Force all modules to use the same jquery version.
      'jquery': path.join(__dirname, 'node_modules/jquery/src/jquery')
    }
  },
  devServer: {
    port: 3001,
    contentBase: '.', // public is where your index.html is located
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        loader: 'style-loader!css-loader?url=false',
      },
      {
        test: /\.s(a|c)ss$/,
        loader: 'style-loader!css-loader?url=false!sass-loader',
      },
      {
        test: require.resolve('jquery'),
        loader: 'expose-loader',
        options: {
          exposes: ['$', 'jQuery'],
        },
      },
      {
        test: /\.(gif|png|jpg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './'
            }
          }
        ]
      },
      {
        test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: 'fonts'
          }
        }]
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: 'images', to: 'images', noErrorOnMissing: true },
        { from: 'fonts', to: 'fonts', noErrorOnMissing: true } //for custom fonts ex. PW Joyeux Noel
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new webpack.EnvironmentPlugin({
      BUNDLE_DATE: Date.now()
    })
  ],
  optimization: {
    mergeDuplicateChunks: true
  }
};