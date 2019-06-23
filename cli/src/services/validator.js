const validator = require('validator');

module.exports = (args, ...keys) => {
  keys.forEach(key => {
    if (!args[key] || validator.isEmpty(args[key])) {
      throw `${key} is required`;
    }
  });
};
