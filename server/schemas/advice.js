const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var adviveSchema = new mongoose.Schema({
	giver: {
		type: ObjectId, 
		ref: 'User'
	},
	content: {
		type: String
	},
	createAt:{
		type: Date,
		default: Date.now()
	},
});

adviveSchema.statics = {
	fetch: function(cb){
		return this
		.find({})
		.sort('meta.createAt')
		.exec(cb);
	},
	findById: function(id,cb){
		return this
		.find({_id,id})
		.exec(cb);
	}
};

module.exports = adviveSchema;