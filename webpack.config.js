const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    'bundle.min.css': [
      path.resolve(__dirname, 'src/css/base.css'),
      path.resolve(__dirname, 'src/css/arrow-icon.css')
    ],
    'bundle.js': [
      path.resolve(__dirname, 'src/js/main.js')
    ]
  }, 
  output: {
    filename: '[name]',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
    ],
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new ExtractTextPlugin("bundle.min.css"),
  ]
};