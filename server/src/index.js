const express = require('express');
const bodyParser = require('body-parser');
var jwt = require('express-jwt');

const appsRoutes = require('./routes/apps');
const loginRoutes = require('./routes/login');

const app = express();
const port = 3000;

// protect routes with jwt
app.use(jwt({ secret: 'blah' }).unless({ path: ['/api/login'] }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// attach the routes
app.use('/api/apps', appsRoutes);
app.use('/api/login', loginRoutes);

app.listen(port, () => console.log(`wutenv server is listening on port ${port}️!`));
