var mongoose = require('mongoose');
var messageSchema = require('../schemas/message.js');

var messageSchema = mongoose.model('message',messageSchema);

module.exports = messageSchema;