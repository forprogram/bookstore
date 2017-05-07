var mongoose = require('mongoose');
var userSchema = require('../schemas/user.js');

var userModel = mongoose.model('User',userSchema);

module.exports = userModel;