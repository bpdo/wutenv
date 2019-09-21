const { Command } = require('@oclif/command');

const ApiService = require('../../services/api');
const ValidatorService = require('../../services/validator');

class EnvCommand extends Command {
  async run() {
    try {
      const { args } = this.parse(EnvCommand);

      // validate the args
      ValidatorService(args, 'app');

      const result = await ApiService.env();

      // [todo] print env vars in a nicer format
      // https://oclif.io/docs/table
      this.log(JSON.stringify(result, null, '  '));
    } catch (err) {
      // [todo] log nice error message
      this.error(err);
    }
  }
}

EnvCommand.args = [{ name: 'app' }];

EnvCommand.description = 'list environment variables';

module.exports = EnvCommand;
