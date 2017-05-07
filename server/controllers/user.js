const userModel = require('../models/userModel.js');
exports.signin=function *() {
    const _user = this.request.body;
    const name = _user.name;
    const password = _user.password;
    const _this = this;
    //body  0: 用户不存在 1: 密码错误

    function compare(user){
		return new Promise((r,j)=>{
			if (user) {
				user.comparePassword(password,function(err,isMatch){
					if (isMatch) {
						console.log('密码正确');
						_this.session.user = user;
						_this.body =_this.session.user;
						r();
					}else{
						console.log('密码错误');
						_this.body = 1;
						r();
					}
				})		
			}else{
    			console.log('用户不存在!');
				_this.body = 0;
				r();
			}
    	})
    }
    const user = yield new Promise((r,j)=>{
    	userModel.findOne({name: name},function (err,user){
    		if (!user) {
    			r();
    		}else{
    			r(user);
    		}

    	})
    });
    yield compare(user);
};

exports.signup = function *() {
  const _user = this.request.body.user_info;
  const code = this.request.body.code;
  const _this = this;
	
	function save(user){
		return new Promise((resolve,reject)=>{
			if (user) {
				let newUser = new userModel(user);
				_this.session.user=newUser;
				newUser.save(()=>{
					_this.body =_this.session.user;
					resolve();
				});
			}else{
    			console.log('该用户名已被注册');
				_this.body = 1;
				resolve();
			}
		})
	}

  let user = yield new Promise( (resolve,reject)=>{ 	
  	userModel.findOne({name:_user.name},function(err,user){
  		if (user){
   			resolve();
  		}else{
				resolve(_user) ;
  		}			
	  })
     });
    yield save(user); 
};

exports.signout = function *() {
  delete this.session;
  this.body = 0;
};

exports.addAddress = function *() {
	const addressData = this.request.body.addressData;
	const userID = this.request.body.userID;
	let userData  = yield userModel.findByIdAndUpdate(
		userID, 
		{$push:{address: addressData}}, 
		{new: true});
	if (userData.address.length === 1) {
		userData = yield userModel.findByIdAndUpdate(
			userID, 
			{$set:{defaultAddress: userData.address[0]._id}}, 
			{new: true});
	}
	this.body = userData;
};

exports.deltAddress = function *() {
	const addressID = this.request.body.addressID;
	const userID = this.request.body.userID;
	const postDefaultAddress = this.request.body.defaultAddress
	let userData = yield userModel.findByIdAndUpdate(
			userID, 
			{$pull:{address: {_id: addressID}}}, 
			{new: true});
	if (postDefaultAddress === addressID) {
		userData = yield userModel.findByIdAndUpdate(
			userID, 
			{$unset:{defaultAddress: 1}}, 
			{new: true});
	}
	this.body = userData;
};

exports.changeDefaultAddress = function *() {
	const addressID = this.request.body.addressID;
	const userID = this.request.body.userID;
	let userData = yield userModel.findByIdAndUpdate(
			userID, 
			{$set:{defaultAddress: addressID}}, 
			{new: true});
	this.body = userData;	
}
exports.changeInfo = function *() {

	const userID = this.request.body.userID;
	const type = this.request.body.type;
	const value = this.request.body.value;
	let userData = yield userModel.findByIdAndUpdate(userID, 
	{$set: {[type]: value} },
	{new: true}
	);
	this.body = userData;
}

exports.upAdvice = function *() {
	const userID = this.request.body.userID;
	const content = this.request.body.content;
	const newAdvice = new adviceModel(data);
	yield newAdvice.save();
	this.body = 0;
}

