var mongoose = require('mongoose');
var orderSchema = require('../schemas/order.js');

var orderSchema = mongoose.model('Order',orderSchema);

module.exports = orderSchema;