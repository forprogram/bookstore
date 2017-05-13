const messageModel = require('../models/messageModel.js');
exports.announce = function *() {
	const messageData = this.request.body;
	const newMessage = new messageModel(messageData);
	yield newMessage.save();
	this.body = 0;
}
exports.getMessages = function *() {
	if (!this.session.user) {
		return this.body = 1;
	}
	const userID = this.session.user._id;
	this.body = yield messageModel.find(
		{$or:[{officialMsgStatus: {$nin: [userID]}, type:{ $in:[0]}}, {receiver: userID, commonMsgStatus: 0}]});
}

exports.hasread = function *() {
	const userID = this.session.user._id;
	const messageID = this.request.body.messageID;
	const type = this.request.body.type;

	//officialMsg:push _id进 officialMsgStatus
	
	if (type === 0) {
		yield messageModel.update({_id: messageID}, {$push: {officialMsgStatus: userID}});
	} else {
		//commonMsg: commonMsgStatus从0设置为1
		yield messageModel.update({_id: messageID}, {$set: {commonMsgStatus: 1}});
	}
	this.body = 0;
}

exports.getOfficialMsg = function *() {
	this.body = yield messageModel.find({type: 0});
}


