const express = require('express');
const emailService  = require('../controler/email-conntroller');
const route = express();
route.post('/', emailService.emailService )
module.exports = route;