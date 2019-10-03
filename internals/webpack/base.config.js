const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { buildPath, publicPath } = require('../../server/constants');

const defaultEntry = ['react-hot-loader/patch'];

const defaultOutput = {
  path: buildPath,
  publicPath,
};

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    },
  }),
  new HtmlWebpackPlugin({
    template: 'client/html/index.html',
    favicon: 'client/html/favicon.ico',
    filename: 'index.html',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
  }),
];

const defaultOptimization = {
  concatenateModules: true,
  splitChunks: {
    chunks: 'all',
  },
  runtimeChunk: 'single',
};

const babelLoader = {
  loader: 'babel-loader',
};

const svgrLoader = {
  loader: '@svgr/webpack',
  options: {
    babel: false,
    svgoConfig: {
      plugins: {
        removeViewBox: false,
      },
    },
  },
};

const urlLoader = {
  loader: 'url-loader',
  options: {
    limit: 1024,
  },
};

module.exports = ({
  mode,
  entry,
  output,
  plugins,
  optimization,
  devtool,
  performance = {},
  target = 'web',
  ...options
}) => ({
  mode,
  entry: defaultEntry.concat(entry),
  output: Object.assign(defaultOutput, output),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [babelLoader],
      },
      {
        test: /\.svg$/,
        issuer: {
          test: /\.js$/,
        },
        use: [babelLoader, svgrLoader, urlLoader],
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
    ],
  },
  plugins: plugins.concat(defaultPlugins),
  optimization: Object.assign(defaultOptimization, optimization),
  devtool,
  performance,
  target,
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  ...options,
});
