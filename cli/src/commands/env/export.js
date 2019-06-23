const { Command } = require('@oclif/command');
const fs = require('fs-extra');
const path = require('path');

const ApiService = require('../../services/api');
const ValidatorService = require('../../services/validator');

class ExportEnvCommand extends Command {
  async run() {
    try {
      const { args } = this.parse(ExportEnvCommand);
      const { app } = args;

      // validate the args
      ValidatorService(args, 'app');

      // get the current env vars
      const result = await ApiService(this.config._rc.url).env(app);

      // create a .env formatted string
      const raw = Object.keys(result)
        .sort()
        .map(key => `${key}=${result[key]}`)
        .join('\n');

      const _path = path.join(process.cwd(), '.env');

      // export the env vars for the app to a local .env file
      fs.writeFileSync(_path, raw);

      this.log(`Exported .env file (${_path})`);
    } catch (err) {
      // [todo] log nice error message
      this.error(err);
    }
  }
}

ExportEnvCommand.args = [{ name: 'app' }];

ExportEnvCommand.description = 'creates a local .env file';

module.exports = ExportEnvCommand;
