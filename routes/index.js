const routes = require('express').Router();
const mailboxes = require('./mailboxes');

routes.use('/', mailboxes);

module.exports = routes;
