var mongoose = require('mongoose');
var adviceSchema = require('../schemas/advice.js');

var adviceSchema = mongoose.model('Advice',adviceSchema);

module.exports = adviceSchema;