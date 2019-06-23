const axios = require('axios');

let URL = null;

const env = async app => {
  // await axios.get(`${URL}/api/env`, { app });

  return Promise.resolve({
    a: 'b',
    c: 'd',
  });
};

const login = async (username, password) => {
  // await axios.post(`${URL}/api/login`, { username, password });

  return Promise.resolve('ABCDEF');
};

const setEnv = async (app, name, value) => {
  // await axios.post(`${URL}/api/env`, { app, name, value });

  // create a new env object
  const env = {};

  // add the name and value
  env[name] = value;

  return Promise.resolve(Object.assign({ a: 'b', c: 'd' }, env));
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
    env,
    login,
    setEnv,
    unsetEnv,
  };
};
