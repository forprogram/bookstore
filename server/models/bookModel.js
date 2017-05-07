var mongoose = require('mongoose');
var bookSchema = require('../schemas/book.js');

var bookSchema = mongoose.model('Book',bookSchema);

module.exports = bookSchema;