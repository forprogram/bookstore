const commentModel = require('../models/commentModel.js');
const messageModel = require('../models/messageModel.js');

exports.upComment = function *() {
  const data = this.request.body;
  const newComment = new commentModel(data);

  let comment = yield new Promise((res, rej) => {
    newComment.save((err, comment) => {
      res(comment);
    })
  });

  nComment =  yield commentModel.findOne({_id: comment._id})
    .populate('giver', 'name')
    .populate('receiver', 'name')
    .populate('book', {user: 1, title: 1});
  this.body = nComment;

  let message = null;

  if (data.receiver) {
    message = {
      content: `您在《${nComment.book.title}》的评论，得到了用户${nComment.giver.name}的回复，点击进入该书详情页查看。`,
      type: 2,
      receiver: data.receiver,
      url: `bookdetail/${nComment.book._id}`
    }
  } else {
    message = {
      content: `您分享的教材《${nComment.book.title}》有新的评价，点击进入该书详情页`,
      type: 2,
      receiver: nComment.book.user,
      url: `bookdetail/${nComment.book._id}`
    }    
  }
  //1、有回复对象：发给receiver：您在《title》的评论，得到了用户(name)的回复，点击进入该书详情页
  //2、无回复对象：发给bookOwner：您分享的教材《title》有新的评价，点击进入该书详情页
  //url:bookdetail/${book._id}

  const newMessage = new messageModel(message);
  yield newMessage.save();

};
exports.showBookComnent = function *() {
  const bookID = this.request.body.bookID;
  yield commentModel.find({book: bookID})
    .populate('giver', {name:1})
    .populate('receiver', {name:1})
    .exec((err, comment) => {
      this.body = comment;
    })
};

exports.changeLike = function *() {
  const _isLike = this.request.body.isLike;
  const _likeCount = this.request.body.likeCount;
  const commentID = this.request.body.commentID;
  const _likeID = this.request.body.likeID;
  if (_isLike) {
    yield commentModel.update(
      {_id: commentID}, 
      {
        $set: {likeCount: _likeCount}, 
        $push: {likeID: _likeID}
      });
  } else {
    yield commentModel.update(
      {_id: commentID}, 
      {
        $set: {likeCount: _likeCount},
        $pull: {likeID: _likeID}
      });
  }
  this.body = 'success';
}
