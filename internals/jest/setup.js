const axios = require('axios');
const { host, port } = require('../../server/constants');

const origin = `http://${host}:${port}`;

global.createApi = apiPath => {
  const api = axios.create({
    baseURL: `${origin}${apiPath}`,
  });

  return api;
};
