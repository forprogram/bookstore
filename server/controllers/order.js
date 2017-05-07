const orderModel = require('../models/orderModel.js');
const bookModel = require('../models/bookModel.js');
const messageModel = require('../models/messageModel.js');

exports.upOrder = function *() {
  const data = this.request.body;
  const newOrder = new orderModel(data);

  let order = yield new Promise((res, rej) => {
    newOrder.save((err, order) => {
      res(order);
    })
  });
  this.body = order._id;
}

exports.readyPay = function *() {
	const orderID = this.request.body.orderID;

	yield orderModel.findOne({_id: orderID})
		.populate({
			path: 'book',
			populate: {
				path: 'user',
				select: {name:1, avatar:1, school:1},
			}
		})
		.exec((err, order) => {
			this.body = order;
		})
}
exports.comfirmPay = function *() {
	const payType = this.request.body.payType;
	const orderID = this.request.body.orderID;
	const bookID = this.request.body.bookID;
	yield orderModel.update({_id: orderID}, {
		$set: {payType: payType, status: 1}
	});
	const book = yield bookModel.findByIdAndUpdate(bookID, 
		{$set: {type: 1}},
		{new:true})
	this.body = 'success';

	//此处确认付款，book.type=1,order.status=1,
	//卖家收到通知，您分享的书(title): 已被喜欢的用户下单并付款
	const newMessage = new messageModel({
		content: `您分享的书(${book.title}):已被喜欢的用户下单并付款,订单编号为${orderID}，请前往我卖出的书页面进行下一步处理。`,
		receiver: book.user,
		type: 1,
	});
	yield newMessage.save();

	
}
exports.showMyOrder = function *() {
	const userID = this.session.user._id;
	yield orderModel.find({user: userID})
	.populate({
		path: 'book',
		populate: {
			path: 'user',
			select: {name:1, avatar:1, school:1}
		}
	})
	.populate('user', {name: 1})
	.exec((err, orders) => {
		this.body = orders;
	});
}
exports.mySellBook = function *() {
	const userID = this.session.user._id;
	yield orderModel.find({seller: userID})
	.populate({
		path: 'book',
		populate: {
			path: 'user',
			select: {name:1, avatar:1, school:1}
		}
	})
	.populate('user', {name: 1})
	.exec((err, orders) => {
		this.body = orders;
	});
}
exports.comfirmDelivery = function *() {
	let orderID = this.request.body.orderID;
	let logisticsData = this.request.body.logistics;
	const order = yield orderModel.findByIdAndUpdate(orderID, 
		{$set: {status: 2, logistics: logisticsData}},
		{new: true}
	)
	this.body = 'success';
	//此处确认发货，order.status=2,
	//买家收到通知，您购买的书(title): 已发货，请前往我的订单查看物流或其他处理
	const newMessage = new messageModel({
		content: `您购买的书(${book.title}):已发货，订单编号为${orderID}，请前往我的订单查看物流或其他处理。`,
		receiver: order.user,
		type: 1,
	});
	yield newMessage.save();
}
exports.cancelOrder = function *() {
	let orderID = this.request.body.orderID;
	let bookID = this.request.body.bookID;

	const order = yield orderModel.findByIdAndUpdate(orderID, 
		{$set: {status: 4}},
		{new: true}
	)
	yield bookModel.update({_id: bookID}, {
		$set: {type: 0}
	})
	this.body = 'success';
	//此处取消订单，order.status=4,
	//买家收到通知，您的订单(编号)已被取消，请前往我的订单查看
	const newMessage = new messageModel({
		content: `您的订单(${orderID})已被取消，请前往我的订单查看。`,
		receiver: order.user,
		type: 1,
	});
	yield newMessage.save();
}
exports.comfirmReceived = function *() {
	let orderID = this.request.body.orderID;
	yield orderModel.update({_id: orderID}, {
		$set: {status: 3}
	})	
	this.body = 'success';
	//此处确认付款，order.status=3,
	const newMessage = new messageModel({
		content: `您分享的书(${book.title}):已被确认收货,订单编号为${orderID}，请前往我卖出的书页面查看。`,
		receiver: book.user,
		type: 1,
	});
	yield newMessage.save();
}
exports.requestRefund = function *() {
	let orderID = this.request.body.orderID;
	yield orderModel.update({_id: orderID}, {
		$set: {status: 5}
	})	
	this.body = 'success';
	//此处申请退款，order.status=5,
	const newMessage = new messageModel({
		content: `您分享的书(${book.title}):被申请退款,订单编号为${orderID}，请前往我卖出的书页面查看并处理。`,
		receiver: book.user,
		type: 1,
	});
	yield newMessage.save();
}
exports.comfirmRefund = function *() {
	let orderID = this.request.body.orderID;
	yield orderModel.update({_id: orderID}, {
		$set: {status: 6}
	})	
	this.body = 'success';
	//此处退款成功，order.status=6,
	const newMessage = new messageModel({
		content: `您的订单(${orderID})，的退款已成功。`,
		receiver: order.user,
		type: 1,
	});
	yield newMessage.save();
}
exports.cancelRefund = function *() {
	let orderID = this.request.body.orderID;
	let oldStatus = 0; 
	yield orderModel.findOne({_id: orderID},(err, order)=> {
		if (order.logistics.hasOwnProperty()) {
			oldStatus = 2;
		} else {
			oldStatus = 1;
		}
	})
	let data = yield orderModel.findByIdAndUpdate(
		orderID, 
		{$set: {status: oldStatus}},
		{new: true}
	)	
	this.body = data;
	//此处取消退款，order.status=1或者2,
	const newMessage = new messageModel({
		content: `您的订单(${orderID})，的退款已取消或被拒绝，请前往我的订单页面查看。`,
		receiver: order.user,
		type: 1,
	});
	yield newMessage.save();
}

