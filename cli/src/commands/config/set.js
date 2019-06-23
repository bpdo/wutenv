const { Command } = require('@oclif/command');
const validator = require('validator');

const ConfigService = require('../../services/config');

class ConfigSetCommand extends Command {
  async run() {
    try {
      const { args } = this.parse(ConfigSetCommand);

      // validate the args
      if (!args.name || validator.isEmpty(args.name)) {
        this.error('Config var name is required.');
      }
      if (!args.value || validator.isEmpty(args.value)) {
        this.error('Config var value is required.');
      }

      ConfigService.set(this.config, args.name, args.value);

      this.log('set done. view updated config with command: wutenv config');
    } catch (err) {
      this.error(err);
    }
  }
}

ConfigSetCommand.args = [{ name: 'name' }, { name: 'value' }];

ConfigSetCommand.description = 'set a configuration var';

module.exports = ConfigSetCommand;
