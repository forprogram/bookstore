<template>
  <div id="signin">
    <p>我要登录</p>
    <input type="text" name="name" placeholder="账号" v-model="postdata.name">
    <input type="password" name="password" placeholder="密码" v-model="postdata.password">
    <a href="">忘了密码?</a>
    <button @click = "signin">登录</button>
    <p>我想注册</p>
    <router-link to="/signup"><button>注册</button></router-link>
  </div>
</template>
<script type="text/javascript">
import { Toast } from 'mint-ui';
export default {
  name:'signin',
  data(){
    return{
      postdata:{
        name:'',
        password:''
      },
      user:{

      }
    }
  },
  methods:{
    signin:function(){
      this.$http.post(IP + ':2017/signin',this.postdata,{credentials: true}).then(({data})=>{
        if (data === 0) {
          Toast({
            message: '用户不存在',
            duration: 1000
          }); 
          return;
        }
        
        if (data === 1) {
          Toast({
            message: '密码错误',
            duration: 1000
          }); 
          return;
        } 
        
        this.user = data;
        Toast({
          message: '登陆成功',
          iconClass: 'icon icon-success',
          duration: 1000
        });
      });
    }
  },
  watch:{
    user() {
      let data = JSON.parse(JSON.stringify(this.user));
      BUS.$emit('user', data);
      setTimeout(() => {
        location.href= IP + ":8090/#/index";
      }, 1000);
    }
  }
}
</script>
<style type="text/css">
#signin{
  padding: 20px 18px 0;
  width: 100%;
  box-sizing: border-box;
}
#signin>input{
  width: 100%;
  height: 36px;
  border: 1px solid #727272;
  box-sizing: border-box;
  margin-bottom: 14px;
  text-indent: 10px;

}
#signin>p{
  font-size: 14px;
  margin-bottom: 16px;
  margin-top: 20px;
}
#signin>a{
  text-decoration:underline;
  color: #999999;
  font-size: 14px;
}
#signin button{
  margin-top: 10px;
  width: 100%;
  height: 42px;
  background-color: #26a2ff;
  color: #fff;
}
#signin>button>a{
  color: #fff;
}
</style>