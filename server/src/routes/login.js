const express = require('express');
const jwt = require('jsonwebtoken');

const _router = express.Router();
const _users = {};

const createToken = async payload => {
  return new Promise((resolve, reject) => {
    // [todo] move secret to env var
    // [todo] determine the expires in size
    jwt.sign(payload, 'blah', {}, function(err, token) {
      if (err) return reject(err);

      // resolve the token
      resolve(token);
    });
  });
};

_router.post('/', async (req, res, next) => {
  try {
    // [todo] validate the body params
    const { password, username } = req.body;

    // if the username doesn't exist, add the user
    if (!_users[username]) {
      _users[username] = { password };
    }

    // if the password doesn't match, 401
    // [todo] encrypt the password before checking
    if (_users[username].password !== password) {
      return res.status(401).send();
    }

    // create the json web token
    const token = await createToken({ username: req.body.username });

    return res.json(token);
  } catch (err) {
    next(err);
  }
});

module.exports = _router;
