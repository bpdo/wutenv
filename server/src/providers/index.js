// const config = require('../config');

const MemoryProvider = require('./MemoryProvider');

const _providers = {
  memory: MemoryProvider,
};

const _instance =
  // _providers[config.provider] !== undefined ? _providers[config.provider] : MemoryProvider;
  MemoryProvider;

console.log('Using instance...');

module.exports = {
  apps: () => _instance.apps(),
  createApp: app => _instance.createApp(app),
  login: (username, password) => _instance.login(username, password),
};
