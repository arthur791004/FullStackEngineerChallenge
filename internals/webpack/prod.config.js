const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const rootPath = process.cwd();
const plugins = [new webpack.HashedModuleIdsPlugin()];

module.exports = require('./base.config')({
  mode: 'production',
  entry: [path.join(rootPath, 'client/index.js')],
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  plugins,
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        parallel: true,
        cache: false,
      }),
    ],
  },
});
