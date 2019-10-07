module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV);

  const presets = ['@babel/preset-react'];

  const plugins = [
    ['module-resolver', { alias: { '@': './client' } }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-proposal-object-rest-spread',
    'babel-plugin-styled-components',
    // FIXME: Cannot read property 'signature' of undefined
    // 'react-hot-loader/babel',
  ];

  switch (process.env.NODE_ENV) {
    case 'test':
      presets.unshift(['@babel/preset-env', { targets: { node: 'current' } }]);
      break;
    default:
      presets.unshift('@babel/preset-env');
      break;
  }

  return {
    presets,
    plugins,
  };
};
