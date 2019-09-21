const { Command } = require('@oclif/command');

const ApiService = require('../../services/api');
const ValidatorService = require('../../services/validator');

class CreateAppCommand extends Command {
  async run() {
    try {
      const { args } = this.parse(CreateAppCommand);

      // validate the args
      ValidatorService(args, 'app');

      // call the create app api
      const result = await ApiService.createApp(args.app);

      this.log(result ? '👍' : '👎');
    } catch (err) {
      // [todo] log nice error message
      this.error(err);
    }
  }
}

CreateAppCommand.args = [{ name: 'app' }];

CreateAppCommand.description = 'create a new app';

module.exports = CreateAppCommand;
