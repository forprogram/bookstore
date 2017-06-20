<style type="text/css">
.adminSignin {
	text-align: center;
}
.adminSignin > input{
	display: block;
	text-align: center;
	margin: 20px auto;
}
</style>
<template>
	<div class="adminSignin">
		<h2>登录</h2>
		<h3>普通用户请联系超级管理员索要管理权限</h3>
		<input type="text" name="name" v-model="postdata.name" placeholder="请输入用户名">
		<input type="password" name="password" v-model="postdata.password" placeholder="请输入密码">
		<input type="button" name="登录" value="登录" @click="signin">
	</div>
</template>
<script type="text/javascript">
import { Toast, MessageBox } from 'mint-ui';
export default {
	data() {
		return {
			postdata: {}
		}
	},
	methods:{
    signin() {
      this.$http.post(IP + ':2017/adminSignin',this.postdata,{credentials: true}).then(({data})=>{
      	switch (data) {
      		case 0:
      			Toast({
		          message: '用户不存在',
		          duration: 1000
		        });
		        break;
		      case 1:
		      	Toast({
		          message: '密码错误',
		          duration: 1000
		        });
		       	break;
		      case 2:
			      Toast({
		          message: '您的权限不够，请联系管理员',
		          duration: 1000
		        });
		        break;
		      default:
		      	Toast({
		          message: '登陆成功',
		          iconClass: 'icon icon-success',
		          duration: 1000
		        });
            BUS.$emit('user', data);
        		this.$router.replace({name: 'usermanage'});
      	}

      });
    }
  },
}
</script>