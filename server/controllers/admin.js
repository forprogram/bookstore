const userModel = require('../models/userModel.js');
const bookModel = require('../models/bookModel.js');
const classModel = require('../models/classModel.js');
const orderModel = require('../models/orderModel.js');
const adviceModel = require('../models/adviceModel.js');
exports.admin = function *() {
	if (this.session.user) {
  	let id = this.session.user._id;
  	let user = yield userModel.findOne({_id: id});
  	if (user.role === 0) {
  		this.body = 2;
  	} else {
  		this.body = user;
  	}
	} else {
  	this.body = 0;
  }
};
exports.adminSignin = function *() {
    const _user = this.request.body;
    const name = _user.name;
    const password = _user.password;
    const _this = this;
    function comparePassword(user){
			return new Promise((r,j)=>{

					user.comparePassword(password, (err, isMatch) => {
						if (isMatch) {
							_this.session.user = user;
							_this.body =_this.session.user;
							r();
						}else{
							_this.body = 1;
							r();
						}
					})
	    	})
    };
    const user = yield new Promise((r,j)=>{
    	userModel.findOne({name: name}, (err,user) => {
    		if (!user) {
    			r();
    		}else{
    			r(user);
    		}

    	})
    });

    if (user) {
    	if (user.role === 0) {
    		return this.body = 2;
    	} else {
    		yield comparePassword(user);
    	}
    } else {
    	this.body = 0;
    }
    //0: 不存在   1:密码错误  2:权限不够
};

exports.userList = function *() {
	const role = this.session.user.role;
	if (role !== 0) {
		this.body = yield userModel.find({});
	}else {
		this.body = '不是管理员';
	}
}

exports.deleteUser = function *() {
	const userID = this.request.body.userID;
	yield userModel.remove({_id: userID});
	this.body = 0;
}

exports.setManage = function *() {
	const userID = this.request.body.userID;
	yield userModel.update({_id: userID}, {$set: {role: 1}});
	this.body = 0;
}
exports.adminUserIndex = function *() {
	const userID = this.request.body.userID;
	const books =	yield bookModel.find({user: userID},{objectId: 1});
	const classes =	yield classModel.find({user: userID},{objectId: 1});
	const orders =	yield orderModel.find({user: userID},{objectId: 1});
	
	this.body = {
		books: books,
		classes: classes,
		orders: orders
	}
}

exports.bookList = function *() {
	const role = this.session.user.role;
	if (role !== 0) {
		this.body = yield bookModel.find({});
	}else {
		this.body = '不是管理员';
	}
}
exports.orderList = function *() {
	const role = this.session.user.role;
	if (role !== 0) {
		this.body = yield orderModel.find({})
		.populate('book', {title:1, images: 1, subtitle:1, sharePrice:1, deliveryPrice:1})
		.populate('user', {name:1})
		.populate('seller', {name:1});
	}else {
		this.body = '不是管理员';
	}
}

exports.deleteBook = function *() {
	bookID = this.request.body.bookID;
	yield bookModel.update({_id: bookID}, {$set: {type: -1}});
	this.body = 0;
}
exports.deleteClass = function *() {
	classID = this.request.body.classID;
	yield classModel.update({_id: classID}, {$set: {status: 1}});
	this.body = 0;
}

exports.classList = function *() {
	const role = this.session.user.role;
	if (role !== 0) {
		this.body = yield classModel.find({});
	}else {
		this.body = '不是管理员';
	}
}


exports.showAdvice = function *() {
	const role = this.session.user.role;

	if (role !== 0) {
		this.body = yield adviceModel.find({}).polulate('giver', 'name');
	}else {
		this.body = '不是管理员';
	}
}


