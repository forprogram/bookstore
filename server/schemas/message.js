const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var messageSchema = new mongoose.Schema({
	//发出消息的人
	giver: {
		type: ObjectId, 
		ref: 'User'
	},
	//no receiver,all receiver
	receiver: {
		type: ObjectId, 
		ref: 'User',
	},
	//0:未读  1:已读
	commonMsgStatus: {
		type: Number,
		default: 0
	},
	//读了就push就去
	officialMsgStatus: [{
		type: ObjectId,
		ref: 'User'
	}],
	//消息类型， 
	//0:官方通告: 下架书籍、下架课程、
	//1:订单(书籍被购买、发货、退款之类、) 
	//2:留言回复(无receiver，则拥有者收提醒，有receiver则receiver收提醒。) 

		//您的书收到了评论：content
		//官方公告:content（无url
		//订单
			//对买家: 您的订单：订单编号 被取消、已发货、
			//对卖家: 您的书编号已被下单 请及时发货 、取消退款、买家已经申请退款，无误请确认
	type: {
		type:Number,
		default: 0
	},
	url: {
		type: String
	},
	content: {
		type: String
	},
	createAt:{
		type: Date,
		default: Date.now()
	},
});

messageSchema.statics = {
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

module.exports = messageSchema;