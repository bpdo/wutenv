const { Command } = require('@oclif/command');
const validator = require('validator');

const ConfigService = require('../../services/config');

class ConfigUnsetCommand extends Command {
  async run() {
    try {
      const { args } = this.parse(ConfigUnsetCommand);

      // validate the args
      if (!args.name || validator.isEmpty(args.name)) {
        this.error('Config var name is required.');
      }

      ConfigService.unset(this.config, args.name);

      this.log('unset done. view updated config with command: wutenv config');
    } catch (err) {
      this.error(err);
    }
  }
}

ConfigUnsetCommand.args = [{ name: 'name' }];

ConfigUnsetCommand.description = 'unset a configuration var';

module.exports = ConfigUnsetCommand;
