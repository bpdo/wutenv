const fs = require('fs-extra');
const homedir = require('os').homedir();
const path = require('path');

const RC_FILE = '.wutenvrc';
const RC_PATH = path.join(homedir, RC_FILE);
const _defaults = {
  url: null,
};

const loadRcFile = (config, path) => {
  const rc = fs.readFileSync(path);
  return Object.assign(config, JSON.parse(rc));
};

const load = () => {
  const config = fs.pathExistsSync(RC_PATH) ? loadRcFile(_defaults, RC_PATH) : _defaults;

  // [todo] validate the configuration

  // create a new config object with sorted keys
  const sortedConfig = {};

  // sort the keys
  Object.keys(config)
    .sort()
    .forEach(key => {
      sortedConfig[key] = config[key];
    });

  return sortedConfig;
};

const save = config => {
  // write the .wutenvrc file
  fs.writeFileSync(RC_PATH, JSON.stringify(config._rc, null, '  '));
};

const set = (config, name, value) => {
  // update the config object
  config._rc[name] = value;

  save(config);
};

const unset = (config, name) => {
  // unset the var by name
  delete config._rc[name];

  // update the .wutenvrc file
  save(config);
};

module.exports = {
  load,
  set,
  unset,
};
