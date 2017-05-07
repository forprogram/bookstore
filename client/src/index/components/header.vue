<style type="text/css">
.header-wrap {
  width: 100%;
  height: 40px;

}
</style>
<template>
<div class="header-wrap">
  <el-header fixed :title="this.$route.name === 'bookdetail'? book_title : headerTitles[$route.name]">
    <a @click="gotoHome" slot="left" v-if="$route.name === 'myOrder'">
      <mt-button icon="back">返回</mt-button>
    </a>
    <a onclick="javascript:history.go(-1)" slot="left" v-show="!~['home', 'index', 'classShare', 'bookShare', 'explore', 'myOrder'].indexOf($route.name)">
      <mt-button icon="back">返回</mt-button>
    </a>
    <a v-if="messages.length>0" slot="right" @click="isUp = !isUp">
      <span>未读 </span><badge size="small" type="error">{{messages.length}}</badge>
    </a>
  </el-header>
  <msg-button v-on:hasread="shiftMessages" v-if="messages.length>0 && isUp" :messages="messages"></msg-button>
</div>
</template>

<script type="text/javascript">
import msgButton from './headerMsgButton.vue';

import { Header, Badge } from 'mint-ui';
export default {
  data() {
    return {
      headerTitles:{
        'home': '个人中心',
        'notification': '消息',
        'outbook': '发布书籍',
        'outclass': '发布课程',
        'userInfo': '个人信息',
        'signin': '登录',
        'signup': '注册',
        'classShare': '课程分享',
        'bookShare': '教材分享',
        'address': '我的配送地址',
        'myShareClass': '我分享的课程',
        'myShareBook': '我分享的教材',
        'myCollectClass': '我收藏的课程',
        'myCollectBook': '我收藏的书',
        'editaddress': '编辑地址',
        'myOrder': '我的订单',
        'pay': '付款',
        'mySellBook': '我卖出的书'
      },
      book_title: '',
      isUp: false,
      messages: []
    }
  },
  components: {
    elHeader: Header,
    Badge, 
    msgButton
  },
  created() {
    BUS.$on('show_book_title', (val) => {
      this.$nextTick(() => {
        this.book_title = val;
      });
    });
    this.getMessages();
  },
  methods: {
    shiftMessages() {
      if (this.messages.length === 0) {
        this.isUp = !this.isUp;
        return;
      }
      if (this.messages.length === 1) {
        this.isUp = !this.isUp;
      }
      //messages 去掉第一个元素
      this.messages.shift();
    },
    getMessages() {
      this.$http.get(IP + ':2017/getMessages', {credentials: true}).then(({data}) => {
        if (data === 1) {
          return;
        }
        this.messages = data;
      }).then(() => {
        setTimeout(() => {
          this.getMessages();
        }, 10000);
      });
    },
    gotoHome() {
      this.$router.push({name: 'home'});
    }
  }

}
</script>