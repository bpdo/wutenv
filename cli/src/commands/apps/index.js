const { Command } = require('@oclif/command');

const ApiService = require('../../services/api');

class AppsCommand extends Command {
  async run() {
    try {
      // call the apps list api
      this.log(await ApiService(this.config._rc.url).apps());
    } catch (err) {
      this.error(err);
    }
  }
}

AppsCommand.aliases = ['apps:ls', 'apps:list'];

AppsCommand.description = 'list apps';

module.exports = AppsCommand;
