const userModel = require('../models/userModel.js');
exports.index=function *(){
	
	if (this.session.user) {
  	let id = this.session.user._id;
  	this.body = yield userModel.find({_id: id});
	} else {
  	this.body = 'nolog';
  }
  
};