var mongoose = require('mongoose');
var classSchema = require('../schemas/class.js');

var classSchema = mongoose.model('Class',classSchema);

module.exports = classSchema;