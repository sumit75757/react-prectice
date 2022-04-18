const express = require('express');
const route = express();
const authchak = require('../Middleware/chack-auth')
const todo = require('../controler/todo')
const mongoos = require('mongoose');


route.get('/',authchak,todo.gettodo );
route.post('/',authchak,todo.postTodo);

module.exports = route;