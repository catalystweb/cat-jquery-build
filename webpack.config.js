<<<<<<< HEAD
// const path = require("path");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

// module.exports = {
//   entry: {
//     "main.min.css": [
//       path.resolve(__dirname, "src/css/base.css"),
//       path.resolve(__dirname, "src/css/arrow-icon.css"),
//       path.resolve(__dirname, "src/css/search-module.css"),
//       path.resolve(__dirname, "src/css/user-module.css"),
//       path.resolve(__dirname, "src/css/user-state.css")
//     ]
//     // 'bundle.js': [
//     //   path.resolve(__dirname, 'src/index.js')
//     // ]
//   },
//   output: {
//     filename: "main",
//     path: path.resolve(__dirname, "dist")
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/,
//         use: ExtractTextPlugin.extract({
//           fallback: "style-loader",
//           use: "css-loader"
//         })
//       }
//     ]
//   },
//   plugins: [new ExtractTextPlugin("main.min.css")]
// };
=======
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: './dist'
  },
};
>>>>>>> master
