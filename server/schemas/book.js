const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var bookSchema = new mongoose.Schema({
	user: {
		type: ObjectId, 
		ref: 'User'
	},
	/*
	*type: 
	*1: 被下单并付款
	*0: 未被下单（下单未付款属于未被下单，书不下架
	*-1: 被下架（书主删除课本）
	
	*/
	type: {
		type: Number,
		default: 0
	},
	isbn: {
		type: String
	},
	image: {
		type: String
	},
	images: {
		type: Object
	},
	title: {
		type: String
	},
	subtitle: {
		type: String
	},
	author: {
		type: String
	},
	publisher: {
		type: String
	},
	price: {
		type: String
	},
	sharePrice: {
		type: Number
	},
	deliveryPrice: {
		type: Number
	},
	quality: {
		type: String
	},
	pages: {
		type: String
	},
	summary: {
		type: String
	},
	catalog: {
		type: String
	},
	shareWord: {
		type: String
	},
	meta:{
		createAt:{
			type: Date,
			default: Date.now()
		},
		updateAt:{
			type: Date,
			default: Date.now()
		}
	}
});



bookSchema.methods={
}

bookSchema.statics = {
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

module.exports = bookSchema;