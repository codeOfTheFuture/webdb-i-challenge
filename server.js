const express = require('express');

const AccountRouter = require('./accounts/accountsRouter');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountRouter);

module.exports = server;
