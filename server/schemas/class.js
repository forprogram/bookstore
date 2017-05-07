const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var classSchema = new mongoose.Schema({
  user: {type: ObjectId, ref: 'User'},
  //0 未下架 
  //1 下架的
  status: {
    type: Number,
    default: 0
  },
  name: {
    type:String
  },
  type: {
    type: String
  },
  school: {
    type: String
  },
  classroom: {
    type: String
  },
  date:{
    type:String
  },
  upTime:{
    type:String
  },
  downTime:{
    type:String
  },
  summary:{
    type:String
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


classSchema.methods={
}

classSchema.statics = {
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

module.exports = classSchema;