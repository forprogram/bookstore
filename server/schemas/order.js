const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var orderSchema = new mongoose.Schema({
  user: {type: ObjectId, ref: 'User'},
  seller: {type: ObjectId,ref: 'User'},
  book: {type: ObjectId, ref: 'Book'},
  address: {
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    name: {
      type: String,
    }
  },
  /*
  *payType:
  *0: 支付宝
  *1: 微信
  */
  payType: {
    type: Number,

  },
  /*w
  * type
  *0: 已下单，未付款
  *1: 下单并付款成功,未发货
  *2: 已发货
  *3: 订单完成
  *4: 订单取消
  *5: 等待退款
  *6: 退款完成
  */
  status: {
    type: Number,
    default: 0
  },
  /*
  *物流logistics
  */
  logistics: {
    company: {
      type: String,
    },
    number: {
      type: Number
    }
  },
  createAt:{
    type: Date,
    default: Date.now()
  },
});

orderSchema.statics = {
  fetch: function(cb){
    return this
    .find({})
    .sort('meta.createAt')
    .exec(cb);//exec（cb） 执行查询，并将查询结果传入回调函数cb
  },
  findById: function(id,cb){
    return this
    .find({_id,id})
    .exec(cb);
  }
};

module.exports = orderSchema;