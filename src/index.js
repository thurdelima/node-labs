const express = require('express');

const cors = require('cors');
// const Sequelize = require('sequelize');

const app = express();
const routes = require('./routes');
// eslint-disable-next-line import/order
const server = require('http').Server(app);
require('./models/index');

// const models = [];

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);

console.log('server on');
