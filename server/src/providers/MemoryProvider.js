const _apps = {};
const _users = {};

module.exports = {
  apps: username => {
    // return a list of apps based on the username
    return Object.keys(_apps);
  },
  createApp: app => {
    console.log(`creating new app ${app}`);
    _apps[app] = { users: [] };
    console.log(_apps);
  },
  login: (username, password) => {
    if (!_users[username]) {
      _users[username] = { password };
    }

    return _users[username].password === password;
  },
};
