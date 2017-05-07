const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var commentSchema = new mongoose.Schema({
  giver: {type: ObjectId, ref: 'User'},
  receiver: {type: ObjectId, ref: 'User'},
  book: {type: ObjectId, ref: 'Book'},
  Class: {type: ObjectId, ref: 'Class'},
  content: '',
  likeCount: {
    type: Number,
    default: 0
  },
  likeID: [ObjectId],
  createAt:{
    type: Date,
    default: Date.now()
  },
});

commentSchema.statics = {
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

module.exports = commentSchema;