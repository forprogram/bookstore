const bookModel = require('../models/bookModel.js');
const userModel = require('../models/userModel.js');
const Segment = require('segment');
var segment = new Segment();
segment.useDefault();
exports.publish=function *(){
  const book = this.request.body;
  const newBook = new bookModel(book);
  yield newBook.save();
  this.body = 'success';
};
exports.showBook = function *() {
  let data =  yield bookModel.find({type: 0}).populate('user', {name:1, avatar:1, school:1}).exec((err, data) => {
    this.body = data;
  });
};

exports.bookdetail=function *(){

  yield bookModel.findOne({_id: this.request.body.bookID}).populate('user', {name:1, avatar:1, school:1}).exec((err, data) => {
    this.body = data;
  });
};
exports.addBookCollect = function *() {
  const bookID = this.request.body.bookID;
  const userID = this.request.body.userID;
  let data = yield userModel.findByIdAndUpdate(
    userID, 
    {$push: {collectBook: bookID}}, 
    {new: true});
  this.body = data;
};

exports.showMyBook = function *() {
  const user = this.session.user._id;
  let data =  yield bookModel.find({user: user}, function(err,books){
    return books;
  });
  this.body = data;
};

exports.myCollectBook = function *() {
  const userID = this.session.user._id;
  let data = yield userModel.findOne({_id: userID}).populate({
    path: 'collectBook',
    populate: {path: 'user'}
  }).exec((err, books) => {
    return books;
  });
  this.body = data.collectBook;
};

exports.removeCollectedBook = function *() {
  const userID = this.session.user._id;
  const bookID = this.request.body.bookID;
  this.body = yield userModel.findByIdAndUpdate(userID, 
    {$pull: {collectBook: bookID}},
    {new: true});
}


exports.selectedBookList=function *(){
  const keyword = this.request.body.value;
  //key 为分词之后的结果对象数组  w为词的内容 p为词性
  if (keyword === '' || keyword.trim() === '') {
    return this.body = yield bookModel.find({}).populate('user', {name:1, avatar:1, school:1}).exec((err, data) => {
      return data;
    });
  }
  const key = segment.doSegment(keyword,{
    simple:true,
    stripPunctuation:true
  });
  //此处实现的方式十分丑。。。。之后修改
  //将分词后的数组构造成正则格式  之后去数据库搜索，再传给前台
  let r = '';
  for (var i = 0; i < key.length; i++) {
    if (i==key.length-1) {
      r += key[i]
    }else{
      r += key[i]+'|';
    }
  };
  let reg = eval("/"+r+"/");
  this.body = yield bookModel.find({title: reg}).populate('user', {name:1, avatar:1, school:1}).exec((err, data) => {
    return data;
  });
};
