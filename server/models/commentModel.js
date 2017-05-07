var mongoose = require('mongoose');
var commentSchema = require('../schemas/comment.js');
var commentSchema = mongoose.model('Comment',commentSchema);
module.exports = commentSchema;