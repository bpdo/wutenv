const { Command } = require('@oclif/command');

const ApiService = require('../../services/api');
const ValidatorService = require('../../services/validator');

class SetAppRoleCommand extends Command {
  async run() {
    try {
      const { args } = this.parse(SetAppRoleCommand);
      const { app, username, role } = args;

      // validate the args
      ValidatorService(args, 'app', 'username', 'role');

      // call the set app role api
      const result = await ApiService(this.config._rc.url).setAppRole(app, username, role);

      this.log(result ? '👍' : '👎');
    } catch (err) {
      // [todo] log nice error message
      this.error(err);
    }
  }
}

SetAppRoleCommand.args = [
  { name: 'app' },
  { name: 'username' },
  {
    name: 'role',
    description: 'role that will be assigned to the user for the app',
    options: ['admin', 'editor', 'readonly'],
  },
];

SetAppRoleCommand.description = 'adds a user to an app based on the role';

module.exports = SetAppRoleCommand;
