const axios = require('axios');

let URL = null;

const apps = async () => {
  // const apps = await axios.get(`${URL}/api/apps`);

  return Promise.resolve(['app1', 'app2']);
};

const createApp = async name => {
  // await axios.post(`${URL}/api/apps`, { name });

  return Promise.resolve(true);
};

const deleteApp = async name => {
  // await axios.delete(`${URL}/api/apps`, { name });

  return Promise.resolve(true);
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

module.exports = url => {
  // set the API url
  URL = url;

  // return the api services
  return {
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
};
