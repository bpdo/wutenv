const ConfigService = require('../../services/config');

module.exports = async function(options) {
  // load the config rc
  options.config._rc = ConfigService.load();
};
