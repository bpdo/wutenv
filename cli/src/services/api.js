const axios = require('axios');

let URL = null;

const login = async (username, password) => {
  // await axios.post(`${URL}/api/login`, { username, password });

  return Promise.resolve('ABCDEF');
};

module.exports = url => {
  // set the API url
  URL = url;

  // return the api services
  return {
    login,
  };
};
