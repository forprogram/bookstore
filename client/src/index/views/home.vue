<style>
.myInfo {
  height: 120px;
  background-color: #29b0ff;
  display: flex;
  flex-flow: row nowrap;
  align-items: center; 
}
.unsignin-img ,.avatar{
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #ccc;
  margin-left: 20px;
}
.signin-btn-wrap {
  display: flex;
  align-items: center;
  margin-left: 20px;
}
.signin-btn {
  height: 120px;
  line-height: 120px;
  color: #fff;
}
.userInfo-wrap {
  height: 120px;
  margin-left: 20px;
  padding-top: 50px;
}
.userInfo-wrap > a {
  font-size: 20px;
}
.userInfo-wrap > p {
  font-size: 12px;
  color: #eee;
}
.home-margin {
  margin-bottom: 10px;
}
</style>
<template>
<div>
    <div v-if="userData._id" class="myInfo">
      <div class="avatar"></div>
      <div class="userInfo-wrap">
        <router-link to="/userInfo">{{userData.name}}</router-link>
        <p>个人信息 ></p>
      </div>
    </div>
    <div v-if="!userData._id" class="myInfo">
      <div class="unsignin-img"></div>
      <div class="signin-btn-wrap">
        <router-link to="/signin" class="signin-btn">点击我登录</router-link>
      </div>
    </div>
  <div class="home-margin">
    <cell title="我分享的教材" is-link :to="{ name: 'myShareBook' }"></cell>
    <cell title="我收藏的教材" is-link :to="{ name: 'myCollectBook' }"></cell>
    <cell title="我卖出的教材" is-link :to="{ name: 'mySellBook' }"></cell>
    <cell title="我买到的教材" is-link :to="{ name: 'myOrder' }"></cell>
  </div>
  <div class="home-margin">
    <cell title="我分享的课程" is-link :to="{ name: 'myShareClass' }"></cell>
    <cell title="我收藏的课程" is-link :to="{ name: 'myCollectClass' }"></cell>
  </div>
</div>
</template>
<script type="text/javascript">
import { Cell } from 'mint-ui';

export default {
  components: {
    Cell
  },
  props:['userData'],

}
</script>