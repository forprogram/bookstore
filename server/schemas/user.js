const mongoose = require('mongoose');
mongoose.Promise = global.Promise
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId
const SALT_WORK_FACTOR = 10;
var userSchema = new mongoose.Schema({
	name:{
		unique:true,
		type:String
	},
	password: String,
	phone:String,
	// 0: nomal user
  // 1: manage user
  // 2: root
  role: {
    type: Number,
    default: 0
  },
  avatar: {
  	type: String,
  	default: 'assets/images/nomalavatar.png',
  },
  //0 男
  //1 女
  //2 未选择
  gender: {
  	type: Number,
  	default: 2
  },
  school: {
  	type: String,
  	default: ''
  },
  institute: {
  	type: String,
  	default: ''
  },
  classname: {
  	type: String,
  	default: ''
  },
  subject: {
  	type: String,
  	default: ''
  },
  grade: {
  	type: String,
  	default: ''
  },
  address: [{
  	address: {
  		type: String,
  		default: ''
  	},
  	phone: {
  		type: String,
  		default: ''
  	},
  	name: {
  		type: String,
  		default: ''
  	}
  }],
  defaultAddress: {
    type: ObjectId,
  },
  collectClass: [{
  	type: ObjectId,
  	ref: 'Class'
  }],
  collectBook: [{
  	type: ObjectId,
  	ref: 'Book'
  }],
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

userSchema.pre('save',function(next){
	var user = this

	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}

	bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
	    if (err) return next(err);
	    bcrypt.hash(user.password, salt, function(err, hash) {
	    	if (err) return next(err);
	      	user.password = hash;
			next();
		});

	});

});

userSchema.methods={
	comparePassword: function(_password, cb) {
	    bcrypt.compare(_password, this.password, function(err, isMatch) {
	      if (err) return cb(err)

	      cb(null, isMatch)
	    })
  	}
}

userSchema.statics = {
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

module.exports = userSchema;