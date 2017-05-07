const router = require('koa-router')();
const Index = require('../controllers/index.js');
const User = require('../controllers/user.js');
const Book = require('../controllers/book.js');
const Class = require('../controllers/class.js');
const Comment = require('../controllers/comment.js');
const Order = require('../controllers/order.js');
const Admin = require('../controllers/admin.js');
const Message = require('../controllers/message.js');


module.exports = function (app){

	router.get('/',Index.index);

	//user
	router.get('/signout',User.signout);
	router.post('/signup', User.signup);
	router.post('/signin', User.signin);
	router.post('/addAddress', User.addAddress);
	router.post('/deltAddress', User.deltAddress);
	router.post('/changeDefaultAddress', User.changeDefaultAddress);
	router.post('/changeInfo', User.changeInfo);
	router.post('/upAdvice', User.upAdvice);

	router.post('/publish',Book.publish);
	router.get('/showBook',Book.showBook);
	router.post('/bookdetail',Book.bookdetail);
	router.post('/addBookCollect',Book.addBookCollect);
	router.get('/showMyBook',Book.showMyBook);
	router.get('/myCollectBook',Book.myCollectBook);
	router.post('/selectedBookList',Book.selectedBookList);
	router.post('/removeCollectedBook',Book.removeCollectedBook);

	router.post('/upClass',Class.upClass);
	router.get('/showClass',Class.showClass);
	router.get('/showMyClass',Class.showMyClass);
	router.post('/addClassCollect',Class.addClassCollect);
	router.get('/myCollectClass',Class.myCollectClass);
	router.post('/selectedClassList',Class.selectedClassList);
	router.post('/removeCollectedClass',Class.removeCollectedClass);
	

	router.post('/upComment',Comment.upComment);
	router.post('/showBookComnent',Comment.showBookComnent);
	router.post('/changeLike',Comment.changeLike);

	router.post('/upOrder',Order.upOrder);
	router.post('/readyPay',Order.readyPay);
	router.post('/comfirmPay',Order.comfirmPay);
	router.get('/showMyOrder',Order.showMyOrder);
	router.get('/mySellBook',Order.mySellBook);
	router.post('/cancelOrder',Order.cancelOrder);
	router.post('/comfirmDelivery',Order.comfirmDelivery);
	router.post('/comfirmReceived',Order.comfirmReceived);
	router.post('/requestRefund',Order.requestRefund);
	router.post('/comfirmRefund',Order.comfirmRefund);
	router.post('/cancelRefund',Order.cancelRefund);

	router.get('/admin',Admin.admin);
	router.post('/adminSignin', Admin.adminSignin);
	router.get('/userList',Admin.userList);
	router.post('/deleteUser', Admin.deleteUser);
	router.post('/setManage', Admin.setManage);
	router.post('/adminUserIndex', Admin.adminUserIndex);
	router.get('/bookList',Admin.bookList);
	router.post('/deleteBook',Admin.deleteBook);
	router.post('/deleteClass',Admin.deleteClass);
	router.get('/classList',Admin.classList);
	router.get('/orderList',Admin.orderList);
	router.get('/showAdvice',Admin.showAdvice);

	router.post('/announce',Message.announce);
	router.get('/getMessages',Message.getMessages);
	router.post('/hasread',Message.hasread);

	app.use(router.routes());
	app.use(router.allowedMethods());
}






