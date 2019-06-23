const { Command } = require('@oclif/command');

const ConfigService = require('../services/config');

class LogoutCommand extends Command {
  async run() {
    try {
      // remove the user token from the rc file
      ConfigService.unset(this.config, 'token');

      this.log('Logged out');
    } catch (err) {
      // [todo] log nice error message
      this.error(err);
    }
  }
}

LogoutCommand.description = 'log user out';

module.exports = LogoutCommand;
