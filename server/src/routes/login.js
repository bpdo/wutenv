const express = require('express');
const jwt = require('jsonwebtoken');

const Provider = require('../providers');

const router = express.Router();

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

router.post('/', async (req, res, next) => {
  try {
    // [todo] validate the body params

    // check if the username and password match the provider
    // [todo] encrypt the password before checking
    if (!Provider.login(req.body.username, req.body.password)) {
      return res.status(401).send();
    }

    // create the json web token
    const token = await createToken({ username: req.body.username });

    return res.json(token);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
