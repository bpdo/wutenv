const { Command } = require('@oclif/command');

const ApiService = require('../../services/api');
const ValidatorService = require('../../services/validator');

class UnsetAppRoleCommand extends Command {
  async run() {
    try {
      const { args } = this.parse(UnsetAppRoleCommand);
      const { app, username } = args;

      // validate the args
      ValidatorService(args, 'app', 'username');

      // call the set app role api
      const result = await ApiService(this.config._rc.url).unsetAppRole(app, username);

      this.log(result ? '👍' : '👎');
    } catch (err) {
      // [todo] log nice error message
      this.error(err);
    }
  }
}

UnsetAppRoleCommand.args = [{ name: 'app' }, { name: 'username' }];

UnsetAppRoleCommand.description = 'removes all app roles for a user';

module.exports = UnsetAppRoleCommand;
