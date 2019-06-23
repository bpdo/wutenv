const { Command } = require('@oclif/command');

const ApiService = require('../../services/api');
const ValidatorService = require('../../services/validator');

class SetEnvCommand extends Command {
  async run() {
    try {
      const { args } = this.parse(SetEnvCommand);
      const { app, name, value } = args;

      // validate the args
      ValidatorService(args, 'app', 'name', 'value');

      // call the set env api
      const result = await ApiService(this.config._rc.url).setEnv(app, name, value);

      // [todo] print env vars in a nicer format
      // https://oclif.io/docs/table
      this.log(JSON.stringify(result, null, '  '));
    } catch (err) {
      // [todo] log nice error message
      this.error(err);
    }
  }
}

SetEnvCommand.args = [
  { name: 'app', description: 'App name' },
  { name: 'name', description: 'Environment variable name' },
  { name: 'value', description: 'Environment variable value' },
];

SetEnvCommand.description = 'sets an environment variable for an app';

module.exports = SetEnvCommand;
