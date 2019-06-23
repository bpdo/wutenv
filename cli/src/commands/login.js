const { Command } = require('@oclif/command');
const validator = require('validator');

const ApiService = require('../services/api');
const ConfigService = require('../services/config');

class LoginCommand extends Command {
  async run() {
    try {
      const { args } = this.parse(LoginCommand);

      // validate the args
      if (!args.username || validator.isEmpty(args.username)) {
        this.error('Username is required');
      }
      if (!args.password || validator.isEmpty(args.password)) {
        this.error('Password is required');
      }

      // call the login api
      const result = await ApiService(this.config._rc.url).login(args.username, args.password);

      // save the user token
      // [todo] save the token in a secure way
      ConfigService.set(this.config, '_token', result);

      this.log('Login successful');
    } catch (err) {
      // [todo] log nice error message
      this.error(err.response.statusText ? err.response.statusText : err);
    }
  }
}

LoginCommand.args = [{ name: 'username' }, { name: 'password' }];

LoginCommand.description = 'log user in';

module.exports = LoginCommand;
