const express = require('express');

const _apps = [];
const _router = express.Router();

const ADMIN_ROLE = 'admin';
const EDITOR_ROLE = 'editor';
const READONLY_ROLE = 'readonly';

const ROLES = [ADMIN_ROLE, EDITOR_ROLE, READONLY_ROLE];

// GET /apps - Get a list of apps
_router.get('/', async (req, res, next) => {
  try {
    // get the username from the user object
    const { username } = req.user;

    // get a list of apps by username
    const apps = _apps
      .filter(app => app.users.some(user => user.username === username))
      .map(app => app.id);

    // return apps
    res.json(apps);
  } catch (err) {
    next(err);
  }
});

// POST /apps - Create a new app
_router.post('/', async (req, res, next) => {
  try {
    // [todo] validate the inputs
    const { id } = req.body;
    const { username } = req.user;

    // [todo] check if the app already exists

    // create the app
    _apps.push({
      id,
      users: [
        {
          username,
          role: ADMIN_ROLE,
        },
      ],
    });

    // return true
    res.json(true);
  } catch (err) {
    next(err);
  }
});

// DELETE /apps - Delete an existing app
_router.delete('/', async (req, res, next) => {
  try {
    // [todo] validate the inputs
    const { id } = req.body;
    const { username } = req.user;

    // find the element
    const index = _apps.findIndex(
      app =>
        app.id === id &&
        app.users.some(user => user.username === username && user.role === ADMIN_ROLE)
    );

    if (index === -1) return res.status(403).json(false);

    _apps.splice(index, 1);

    res.json(true);
  } catch (err) {
    next(err);
  }
});

// POST /apps/:id/roles - Create a new user role
_router.post('/:id/roles', async (req, res, next) => {
  try {
    // [todo] validate the inputs
    const { id, username, role } = req.body;
    // const { username } = req.user;

    // validate the role
    if (!ROLES.includes(role)) throw 'Unknown role.';

    // find the app by id and admin role
    const app = _apps.find(
      app =>
        app.id === id &&
        app.users.some(user => user.username === username && user.role === ADMIN_ROLE)
    );

    if (!app) throw 'App not found.';

    // add a new user
    app.users.push({
      username,
      role,
    });

    res.json(true);
  } catch (err) {
    next(err);
  }
});

// DELETE /apps/:id/roles - Delete an existing user role
_router.delete('/:id/roles', async (req, res, next) => {
  try {
    // [todo] validate the inputs
    const { id, user } = req.body;

    // find the app
    const app = _apps.find(
      app =>
        app.id === id &&
        app.users.some(user => user.username === username && user.role === ADMIN_ROLE)
    );

    if (!app) throw 'App not found.';

    // find the user in the app users
    const index = app.users.findIndex(_user => _user === user);

    if (index === -1) throw 'User not found.';

    // [todo] validate if the last admin is being removed

    // remove the user from the users list
    app.users.splice(index, 1);

    return res.json(true);
  } catch (err) {
    next(err);
  }
});

module.exports = _router;
