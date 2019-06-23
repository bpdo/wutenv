const { Command } = require('@oclif/command');

class ConfigCommand extends Command {
  async run() {
    // log the configuration
    this.log(JSON.stringify(this.config._rc, null, '  '));
  }
}

ConfigCommand.description = 'add/remove wutenv configuration';

module.exports = ConfigCommand;
