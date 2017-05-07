import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';

import signin from './views/signin.vue';
import signup from './views/signup.vue';
import bookShare from './views/bookShare.vue';
import outbook from './views/outbook.vue';
import outclass from './views/outclass.vue';
import notification from './views/notification.vue';
import home from './views/home.vue';
import address from './views/address.vue';
import editaddress from './views/editaddress.vue';
import myClass from './views/class.vue';
import myBook from './views/myBook.vue';
import userInfo from './views/userInfo.vue';
import bookdetail from './views/bookdetail.vue';
import myOrder from './views/myOrder.vue';
import order from './views/order.vue';
import pay from './views/pay.vue';



import Resource from 'vue-resource'
import MintUI from 'mint-ui';


Vue.use(Router);
Vue.use(Resource);
Vue.use(MintUI);
window.BUS = new Vue();
window.IP = 'http://192.168.0.16';
Vue.config.devtools = true;
const router = new Router({
  routes: [
    {
      path: '/index', 
      name: 'bookShare',
      component: bookShare
    },
    {
      path: '/', 
      redirect:'/index'
    },
    {
      path: '/classShare', 
      name: 'classShare',
      component: myClass
    },
    {
      path: '/outbook', 
      name: 'outbook',
      component: outbook
    },
    {
      path: '/address', 
      name: 'address',
      component: address
    },
    {
      path: '/editaddress', 
      name: 'editaddress',
      component: editaddress
    },
    {
      path: '/outclass', 
      name: 'outclass',
      component: outclass
    },
    {
      path: '/notification', 
      name: 'notification',
      component: notification
    },
    {
      path: '/home', 
      name: 'home',
      component: home
    },
    {
      path: '/myshareclass', 
      name: 'myShareClass',
      component: myClass
    },
    {
      path: '/mycollectclass', 
      name: 'myCollectClass',
      component: myClass
    },
    {
      path: '/mysharebook', 
      name: 'myShareBook',
      component: myBook
    },
    {
      path: '/mycollectbook', 
      name: 'myCollectBook',
      component: myBook
    },
    {
      path: '/userInfo', 
      name: 'userInfo',
      component: userInfo
    },
    {
      path: '/bookdetail/:bookID',
      name: 'bookdetail',
      component: bookdetail
    },
    {
      path: '/order/:bookID',
      name: 'order',
      component: order
    },
    {
      path: '/pay/:orderID',
      name: 'pay',
      component: pay
    },
    {
      path: '/myOrder', 
      name: 'myOrder',
      component: myOrder
    },
    {
      path: '/mySellBook', 
      name: 'mySellBook',
      component: myOrder
    },
    {
      path: '/signin',
      name: 'signin', 
      component: signin
    },
    {
      path: '/signup',
      name: 'signup', 
      component: signup
    },
  ]
});
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
