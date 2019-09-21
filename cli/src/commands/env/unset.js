const { Command } = require('@oclif/command');

const ApiService = require('../../services/api');
const ValidatorService = require('../../services/validator');

class UnsetEnvCommand extends Command {
  async run() {
    try {
      const { args } = this.parse(UnsetEnvCommand);
      const { app, name } = args;

      // validate the args
      ValidatorService(args, 'app', 'name');

      // call the unset env api
      const result = await ApiService.unsetEnv(app, name);

      // [todo] print env vars in a nicer format
      // https://oclif.io/docs/table
      this.log(JSON.stringify(result, null, '  '));
    } catch (err) {
      // [todo] log nice error message
      this.error(err);
    }
  }
}

UnsetEnvCommand.args = [
  { name: 'app' },
  { name: 'name', description: 'Environment variable name' },
];

UnsetEnvCommand.description = 'unsets an environment variable for an app';

module.exports = UnsetEnvCommand;
