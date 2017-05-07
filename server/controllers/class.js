const classModel = require('../models/classModel.js');
const userModel = require('../models/userModel.js');
const Segment = require('segment');
var segment = new Segment();
segment.useDefault();

exports.upClass=function *(){
  const upclass = this.request.body;
  const newClass = new classModel(upclass);
  yield newClass.save();
  this.body = 'success';
};
exports.showClass = function *() {
  this.body =  yield classModel.find({status: 0}, function(err,classes){
    return classes;
  });
  
};

exports.showMyClass = function *() {
  const user = this.session.user._id;
  let data =  yield classModel.find({user: user}, function(err,classes){
    return classes;
  });
  this.body = data;
};
exports.addClassCollect = function *() {
  const classID = this.request.body.classID;
  const userID = this.request.body.userID;
  let data = yield userModel.findByIdAndUpdate(
    userID, 
    {$push: {collectClass: classID}},
    {new: true});
  this.body = data;
  
};
exports.myCollectClass = function *() {
  const user = this.session.user._id;
  let data = yield userModel.findOne({_id: user}, ['collectClass']).populate('collectClass').exec((err, data) => {
    return data;
  });
  this.body = data.collectClass;
};

exports.removeCollectedClass = function *() {
  const userID = this.session.user._id;
  const classID = this.request.body.classID;
  this.body = yield userModel.findByIdAndUpdate(userID, 
    {$pull: {collectClass: classID}},
    {new: true});
}

exports.selectedClassList=function *(){
  const keyword = this.request.body.value;
  //key 为分词之后的结果对象数组  w为词的内容 p为词性
  if (keyword === '' || keyword.trim() === '') {
    return this.body = yield classModel.find({}, function(err,classes){
      return classes;
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
  this.body =  yield classModel.find({name: reg}, function(err,classes){
    return classes;
  });
};



