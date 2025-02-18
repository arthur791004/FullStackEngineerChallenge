const path = require('path');

const addDevServer = app => {
  /* eslint-disable global-require, import/no-extraneous-dependencies */
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../../internals/webpack/dev.config');
  /* eslint-enable global-require, import/no-extraneous-dependencies */

  const compiler = webpack(webpackConfig);
  const options = {
    logLevel: 'error',
    publicPath: webpackConfig.output.publicPath,
    watchOptions: {
      ignored: /node_modules/,
    },
  };

  app.use(webpackDevMiddleware(compiler, options));
  app.use(webpackHotMiddleware(compiler));

  app.get('*', (_, res) => {
    const filename = path.join(compiler.outputPath, 'index.html');
    const html = compiler.outputFileSystem.readFileSync(filename);

    res.send(html.toString());
  });
};

module.exports = addDevServer;
