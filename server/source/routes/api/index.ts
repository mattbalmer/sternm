import express from 'express';
import * as parser from 'body-parser';
const routes = express.Router();

routes.use(parser.json());

routes.use('/users', require('./users'));

module.exports = routes;
export {}