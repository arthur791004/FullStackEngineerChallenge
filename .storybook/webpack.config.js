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

const config = async ({ config }) => {
  // make storybook handle svg in js files with @svgr/webpack
  config.module.rules.unshift({
    test: /\.svg$/,
    issuer: {
      test: /\.js$/,
    },
    use: [babelLoader, svgrLoader, urlLoader],
  });

  return config;
};

module.exports = config;
