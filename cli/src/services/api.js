const axios = require('axios');

const ConfigService = require('../services/config');

// get the token from the configuration
const { _token: TOKEN, url: URL } = ConfigService.load();

const apps = async () => {
  const result = await axios.get(`${URL}/api/apps`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  });

  return result.data;
};

const createApp = async id => {
  const result = await axios.post(
    `${URL}/api/apps`,
    {
      id,
    },
    {
      headers: { Authorization: `Bearer ${TOKEN}` },
    }
  );

  return result.data;
};

const deleteApp = async id => {
  const result = await axios.delete(`${URL}/api/apps`, {
    headers: { Authorization: `Bearer ${TOKEN}` },
    data: {
      id,
    },
  });

  return result.data;
};

const env = async app => {
  // await axios.get(`${URL}/api/env`, { app });

  return Promise.resolve({
    a: 'b',
    c: 'd',
  });
};

const login = async (username, password) => {
  const result = await axios.post(`${URL}/api/login`, { username, password });

  return result.data;
};

const setAppRole = async (app, username, role) => {
  return Promise.resolve(true);
};

const setEnv = async (app, name, value) => {
  // await axios.post(`${URL}/api/env`, { app, name, value });

  // create a new env object
  const env = {};

  // add the name and value
  env[name] = value;

  return Promise.resolve(Object.assign({ a: 'b', c: 'd' }, env));
};

const unsetAppRole = async (app, username) => {
  return Promise.resolve(true);
};

const unsetEnv = async (app, name) => {
  // await axios.delete(`${URL}/api/env`, { app, name });

  return Promise.resolve({
    a: 'b',
    c: 'd',
  });
};

// return the api services
module.exports = {
  apps,
  createApp,
  deleteApp,
  env,
  login,
  setAppRole,
  setEnv,
  unsetAppRole,
  unsetEnv,
};
