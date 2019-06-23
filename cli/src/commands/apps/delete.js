const { Command } = require('@oclif/command');

const ApiService = require('../../services/api');
const ValidatorService = require('../../services/validator');

class DeleteAppCommand extends Command {
  async run() {
    try {
      const { args } = this.parse(DeleteAppCommand);

      // validate the args
      ValidatorService(args, 'app');

      // call the delete app api
      const result = await ApiService(this.config._rc.url).deleteApp(args.app);

      this.log(result ? '👍' : '👎');
    } catch (err) {
      this.error(err);
    }
  }
}

DeleteAppCommand.args = [{ name: 'app' }];

DeleteAppCommand.description = 'delete an existing app (requires app admin role)';

module.exports = DeleteAppCommand;
