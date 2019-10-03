module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './client',
        },
      },
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        loose: true,
      },
    ],
    '@babel/plugin-proposal-object-rest-spread',
    'babel-plugin-styled-components',
    // FIXME: Cannot read property 'signature' of undefined
    // 'react-hot-loader/babel',
  ],
};
