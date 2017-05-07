import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import bookmanage from './views/bookmanage.vue';
import usermanage from './views/usermanage.vue';
import signin from './views/signin.vue';
import classmanage from './views/classmanage.vue';
import ordermanage from './views/ordermanage.vue';
import announce from './views/announce.vue';
import advice from './views/advice.vue';

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
      path: '/', 
      name: 'usermanage',
      component: usermanage
    },
    {
      path: '/signin', 
      name: 'signin',
      component: signin
    },

    {
      path: '/bookmanage', 
      name: 'bookmanage',
      component: bookmanage
    },
    {
      path: '/classmanage', 
      name: 'classmanage',
      component: classmanage
    },
    {
      path: '/ordermanage', 
      name: 'ordermanage',
      component: ordermanage
    },
    {
      path: '/announce', 
      name: 'announce',
      component: announce
    },
    {
      path: '/advice', 
      name: 'advice',
      component: advice
    }
   ]
 })

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
