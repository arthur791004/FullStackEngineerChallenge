const config = {
  '*.js': [
    // use prettier to make consistent styles
    'prettier --write',
    'yarn run lint:eslint --fix',
    'git add',
  ],
};

module.exports = config;
